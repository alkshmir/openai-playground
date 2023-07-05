import openai
import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

openai.api_key = os.environ.get("OPENAI_API_KEY")
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "あなたは学校の先生です。"},
        {"role": "user", "content": "おはようございます"},
    ]
)


print(f"ChatGPT:{response['choices'][0]['message']['content']}")
print(response['usage'])

