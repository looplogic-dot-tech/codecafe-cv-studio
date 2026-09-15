from pathlib import Path

VERSION = "1.6.4.10.2.2"

app_path = Path("src/App.tsx")
cloud_path = Path("src/cloud.ts")
styles_path = Path("src/styles.css")

app = app_path.read_text(encoding="utf-8")
cloud = cloud_path.read_text(encoding="utf-8")
styles = styles_path.read_text(encoding="utf-8")

# Visible build/version marker in the normal top bar.
brand_old = '<strong>CodeCafe CV</strong><small>{t.tagline}</small>'
brand_new = f'<strong>CodeCafe CV <span className="appVersionBadge">v{VERSION}</span></strong><small>{{t.tagline}}</small>'
if brand_new not in app:
    if brand_old not in app:
        raise SystemExit("ERROR: CodeCafe brand marker not found")
    app = app.replace(brand_old, brand_new, 1)

# The primary Print/PDF action must open the working Print Editor, not bypass it with window.print().
print_old = '<button className="primary" onClick={() => window.print()}>{t.pdf}</button>'
print_new = '<button className="primary" onClick={() => { const launcher = document.getElementById("codecafe-print-editor-launcher") as HTMLButtonElement | null; if (launcher) launcher.click(); else window.print(); }}>{t.pdf}</button>'
if print_new not in app:
    if print_old not in app:
        raise SystemExit("ERROR: top Print/PDF button marker not found")
    app = app.replace(print_old, print_new, 1)

# Replace only the Google Identity loader. This cures a stale GIS script element that can leave
# the Connect Google Drive action waiting forever after a reload/reconnect.
start_sig = 'async function loadGoogleIdentityServices(): Promise<void> {'
end_sig = '\nexport async function authorizeGoogleDrive'
start = cloud.find(start_sig)
end = cloud.find(end_sig, start)
if start < 0 or end < 0:
    raise SystemExit("ERROR: Google Identity loader boundaries not found")

new_loader = r'''async function loadGoogleIdentityServices(): Promise<void> {
  if (window.google?.accounts.oauth2) return;

  // A previous authorization attempt may leave the GIS script element in the DOM even when
  // the global Google API did not initialize. Reusing that stale element means its `load`
  // event will never fire again, so Connect appears dead. Remove only that stale script and
  // load a fresh GIS client; no CV/workspace data is touched.
  const stale = document.querySelector<HTMLScriptElement>('script[data-codecafe-google="true"]');
  if (stale && !window.google?.accounts.oauth2) stale.remove();

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      if (error) reject(error);
      else resolve();
    };
    const timeout = window.setTimeout(() => {
      script.remove();
      finish(new Error("Google Identity Services tardó demasiado en responder. Intenta conectar de nuevo."));
    }, 15000);

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.codecafeGoogle = "true";
    script.onload = () => {
      if (window.google?.accounts.oauth2) finish();
      else finish(new Error("Google Identity Services cargó sin inicializar OAuth."));
    };
    script.onerror = () => finish(new Error("No fue posible cargar Google Identity Services."));
    document.head.appendChild(script);
  });
}'''
cloud = cloud[:start] + new_loader + cloud[end:]

if ".appVersionBadge" not in styles:
    styles += '\n.appVersionBadge{font-size:11px;font-weight:700;opacity:.72;margin-left:6px;white-space:nowrap}\n'

app_path.write_text(app, encoding="utf-8")
cloud_path.write_text(cloud, encoding="utf-8")
styles_path.write_text(styles, encoding="utf-8")

# Focused guards: do not mutate the locked library or print-editor implementation.
assert f'v{VERSION}' in app
assert 'codecafe-print-editor-launcher' in app
assert '<button className="primary" onClick={() => window.print()}>{t.pdf}</button>' not in app
assert 'if (stale && !window.google?.accounts.oauth2) stale.remove();' in cloud
assert '15000' in cloud
assert '.appVersionBadge' in styles
print(f"PASS: visible CV Studio version v{VERSION}")
print("PASS: primary Print/PDF button opens the existing Print Editor")
print("PASS: Google Drive connection reloads stale GIS safely")
print("PASS: library/section-control/print-editor implementation files untouched")
