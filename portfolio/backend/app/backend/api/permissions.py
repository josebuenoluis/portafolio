from rest_framework.permissions import BasePermission, SAFE_METHODS

class PostNoAthenticated(BasePermission):
    """
    Permite POST sin autenticación, pero requiere autenticación para PUT, PATCH y DELETE.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        elif request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated