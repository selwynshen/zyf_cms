#coding=utf-8
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import ensure_csrf_cookie

def render_response(request,*args):
    if len(args) == 2:
        lst = list(args)
        lst[1]['luser'] = request.luser
        return render_to_response(lst[0],lst[1],context_instance=RequestContext(request))
    else:
        return render_to_response(args,context_instance=RequestContext(request))

@ensure_csrf_cookie
def render_response_with_csrfcookie(request,*args):
    if len(args) == 2:
        lst = list(args)
        lst[1]['luser'] = request.user
        return render_to_response(lst[0],lst[1],context_instance=RequestContext(request))
    else:
        return render_to_response(args,context_instance=RequestContext(request))

def render_to_error_page(request,errorMsg):
    return render_to_response('error/error.html',{'errorMsg':errorMsg[0]})

