from rest_framework import permissions


class QuotePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'list':
            return True
        elif view.action == 'create':
            return True
        elif view.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            return True
        elif view.action == 'update':
            return request.user.is_staff
        elif view.action == 'partial_update':
            return True
        elif view.action == 'destroy':
            return request.user.is_staff
        else:
            return False
