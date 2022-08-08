from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
from random import randint
# NOTE: this needs to change every day, and for each lotter you want to enter
urls = ["https://lottery.broadwaydirect.com/enter-lottery/?lottery=562466&window=popup"]



# Initiate the browser
browser  = webdriver.Chrome(ChromeDriverManager().install())


def random_num_string(start_num, end_num):
  num = randint(start_num, end_num)
  if num > 0 and num < 10:
    return "0%s" % num
  return num


def click_and_wait(name, text="", wait=.5):
  elem = browser.find_element(By.NAME, name)  # Find the search box
  elem.click()
  if (text != ""):
    elem.send_keys(text)
  time.sleep(wait)

for url in urls:
  name = "Val"
  print("running with name %s" % name)
  browser.get(url)
  click_and_wait("dlslot_name_first", name)
  click_and_wait("dlslot_name_last", "Ault")
  click_and_wait("dlslot_ticket_qty", "2")
  click_and_wait("dlslot_email", "valault1+%s@gmail.com" % name)
  click_and_wait("dlslot_dob_month", random_num_string(1,12))
  click_and_wait("dlslot_dob_day", random_num_string(1,28))
  click_and_wait("dlslot_dob_year", random_num_string(1993,2001))
  click_and_wait("dlslot_zip", "84094")
  click_and_wait("dlslot_country", "u")
  click_and_wait("dlslot_agree")
  browser.find_element(By.CLASS_NAME, "dlslot-field-terms").click()
  time.sleep(5)
  


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

time.sleep(10)

browser.quit()