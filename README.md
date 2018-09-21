# E-TomexG


https://www.sqlservercentral.com/Forums/Topic845880-8-1.aspx
https://stackoverflow.com/questions/3928016/django-auto-generating-unique-model-fields-and-recursively-calling-auto-generat

To generate PNR
import uuid
uuid.uuid4().hex[:6].upper()


def generate(size=5):
    code = ''.join(random.choice(string.letters[26:] + string.digits) for in range(size))
    if check_if_duplicate(code):
        return generate(size=5)
    return code
