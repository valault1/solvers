from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
import time
from random import randint

times_to_enter = 25
# NOTE: this needs to change every day, and for each lotter you want to enter
urls = ["https://lottery.broadwaydirect.com/enter-lottery/?lottery=564053&window=popup"]
# lottery overview page - https://lottery.broadwaydirect.com/
# Wicked - https://lottery.broadwaydirect.com/show/wicked/
# aladdin - https://lottery.broadwaydirect.com/show/aladdin/
# six - https://lottery.broadwaydirect.com/show/six-ny/
# lion king - https://lottery.broadwaydirect.com/show/the-lion-king

# NOTE: Must be a gmail
main_email="typicalval1"
# if true, will prompt the user before continuing
wait_for_input=False

possible_zip_codes = ["38017", "84094", "84606", "60176", "63101", "38101", "84119","91316"]

first_names_file = open('first_names.txt', "r")
last_names_file = open('last_names.txt', "r")
first_names = [line for line in first_names_file.readlines()]
last_names = [line for line in last_names_file.readlines()]


# Initiate the browser

options = webdriver.ChromeOptions()
options.add_argument("--disable-blink-features=AutomationControlled")
browser  = webdriver.Chrome(ChromeDriverManager().install(), options=options)

def random_num_string(start_num, end_num):
  num = randint(start_num, end_num)
  if num > 0 and num < 10:
    return "0%s" % num
  return num


def click_and_wait(name, text="", wait=0):
  elem = browser.find_element(By.NAME, name) 
  elem.click()
  if (text != ""):
    elem.send_keys(text)
  time.sleep(wait)
def wait_for_confirmation():
  timeout = 30
  try:
    element_present = EC.presence_of_element_located((By.ID, 'primary'))# id="post-84" is confirm your email page, id="post-86" is "you're entered!" page
    WebDriverWait(browser, timeout).until(element_present)
  except:
      print("Timed out waiting for page to load")


for url in urls:
  for num in range(times_to_enter):
    first_name = first_names[randint(0, len(first_names)-1)]
    last_name = last_names[randint(0, len(last_names)-1)]
    print("running with %s, entry #%s/%s" % (first_name + " " + last_name, num+1, times_to_enter))
    browser.get(url)
    try:
      click_and_wait("dlslot_name_first", first_name)
      click_and_wait("dlslot_name_last", last_name)
      click_and_wait("dlslot_ticket_qty", "2")
      # scroll to bottom
      browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")
      
      click_and_wait("dlslot_country", "u")
      ActionChains(browser).send_keys(Keys.ENTER).perform()
      click_and_wait("dlslot_email", "%s+%s@gmail.com" % (main_email, first_name + "_" + last_name))
      click_and_wait("dlslot_dob_month", random_num_string(1,12))
      click_and_wait("dlslot_dob_day", random_num_string(1,28))
      click_and_wait("dlslot_dob_year", random_num_string(1980,2001))
      click_and_wait("dlslot_zip", possible_zip_codes[randint(0,len(possible_zip_codes)-1)])
      ActionChains(browser).send_keys(Keys.TAB * 2, " ").perform()
      try:
        
        recaptcha = browser.find_element(By.CLASS_NAME, 'g-recaptcha')
        print("FOUND RECAPTCHA - WAIT until next page loads")
        if wait_for_input:
          input("Press Enter when ready to continue...")
        wait_for_confirmation()
      except Exception as e: 
        print("ERROR WHILE FINDING RECAPTCHA")
        # if the flag is true, or if they have already inputted, wait for input
        if wait_for_input:
          input("Press Enter when ready to continue...")
        browser.find_element(By.CLASS_NAME, "enter-now-button").click() 
        wait_for_confirmation()

      
    except Exception as e: print(e)
  


# dlslot_name_first
# dlslot_name_last
# dlslot_ticket_qty
# dlslot_email
# dlslot_dob_month
# dlslot_dob_day
# dlslot_dob_year
# dlslot_zip
# dlslot_country
# dlslot_agree

browser.quit()