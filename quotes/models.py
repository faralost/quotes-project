from django.db import models


class Quote(models.Model):
    NEW = 'new'
    MODERATED = 'mod'
    STATUS_CHOICES = [
        (NEW, 'New'),
        (MODERATED, 'Moderated'),
    ]
    text = models.TextField(max_length=666)
    name = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    rating = models.SmallIntegerField(default=0)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default=NEW)
    created_at = models.DateTimeField(auto_now_add=True)

