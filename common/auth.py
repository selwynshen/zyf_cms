#coding=utf-8
from django.http import HttpResponseRedirect


from django.shortcuts import render_to_response

def auth_required(function):
    def decorator(request, *args, **kwargs):
        user = request.session.get('user')
        if not user:
            return HttpResponseRedirect(LOGIN_URL)
        return function(request, *args, **kwargs)
    return decorator

