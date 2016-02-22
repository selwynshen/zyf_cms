#coding=utf-8
from django.db import models
from datetime import datetime


class BaseModel(models.Model):
    status = models.IntegerField(default=0)
    create_time = models.DateTimeField(default=datetime.now)
    last_update = models.DateTimeField(default=datetime.now)

    class Meta:
        abstract=True