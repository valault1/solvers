from selenium import webdriver
from browsermobproxy import Server
import json
import time

# Start BrowserMob Proxy
server = Server("path_to_browsermob_proxy/bin/browsermob-proxy")
server.start()
proxy = server.create_proxy()

# Setup Selenium WebDriver with the proxy
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument(f'--proxy-server={proxy.proxy}')
driver = webdriver.Chrome(executable_path='/path/to/chromedriver', options=chrome_options)

# Start capturing network traffic
proxy.new_har("example", options={'captureHeaders': True, 'captureContent': True})

# Navigate to the web page you want to capture
driver.get("http://example.com")

# Wait for the page to load and network requests to complete
time.sleep(5)

# Export the HAR data to a file
har_data = proxy.har  # This is a Python dict representing the .har content
with open("network_data.har", "w") as har_file:
    json.dump(har_data, har_file)

# Clean up and stop the server
driver.quit()
server.stop()
