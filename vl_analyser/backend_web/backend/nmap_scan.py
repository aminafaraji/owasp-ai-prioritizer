import subprocess

def run_nmap_scan(target):
    result = subprocess.run(["nmap", "-sV", target], capture_output=True, text=True)
    return result.stdout