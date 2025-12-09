from zapv2 import ZAPv2
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

def run_zap_scan(target):
    """
    Run OWASP ZAP scan on the target URL
    
    Args:
        target (str): URL to scan (e.g., "http://testphp.vulnweb.com")
    
    Returns:
        list: Scan results/alerts
    """
    try:
        # Validate target URL
        if not target.startswith(('http://', 'https://')):
            raise ValueError("Invalid URL - must start with http:// or https://")

        # Initialize ZAP
        zap = ZAPv2(
            proxies={
                'http': 'http://127.0.0.1:8080',
                'https': 'http://127.0.0.1:8080'  # Note: Changed to http for consistency
            },
            apikey='ifk2ip8b3m1cpoecq7bloeum6j'  # Add if ZAP API requires it
        )

        logging.info(f"Accessing target {target}")
        
        # Verify ZAP connection
        try:
            zap.urlopen(target)
        except Exception as e:
            logging.error(f"Failed to access target: {str(e)}")
            raise

        time.sleep(2)  # Allow ZAP to process the site

        logging.info("Starting active scan...")
        scan_id = zap.ascan.scan(target)
        
        # Monitor scan progress
        while int(zap.ascan.status(scan_id)) < 100:
            progress = zap.ascan.status(scan_id)
            logging.info(f"Scan progress: {progress}%")
            time.sleep(5)

        logging.info("Scan completed successfully")
        
        # Get results
        alerts = zap.core.alerts(baseurl=target)
        return alerts

    except Exception as e:
        logging.error(f"Scan failed: {str(e)}")
        raise

# Example usage (for testing)
if __name__ == "__main__":
    try:
        results = run_zap_scan("http://testphp.vulnweb.com")
        print(f"Found {len(results)} vulnerabilities")
        for alert in results:
            print(f"[{alert['risk']}] {alert['name']}")
    except Exception as e:
        print(f"Error during scan: {e}")