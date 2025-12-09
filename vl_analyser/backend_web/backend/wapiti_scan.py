import subprocess

def run_wapiti_scan(url):
    print("⏳ Wapiti scan started...")
    try:
        result = subprocess.check_output(
            [r'C:\Users\user\AppData\Roaming\Python\Python313\Scripts\wapiti.exe', '-u', url, '-f', 'json'],
            stderr=subprocess.STDOUT,
            text=True
        )
        print("✅ Wapiti scan completed.")
        return result

    except subprocess.CalledProcessError as e:
        return f"Erreur Wapiti : {e.output}"

