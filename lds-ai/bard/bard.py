import google.generativeai as genai
import os


api_key = open(".apikey", "r").read()
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Write a story about a magic backpack.")
print(response.text)