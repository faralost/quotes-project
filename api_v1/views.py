from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response

from api_v1.permissions import QuotePermission
from api_v1.serializers import QuoteSerializer, QuoteUpdateSerializer, QuoteUpdateRatingSerializer
from quotes.models import Quote


class QuoteViewSet(viewsets.ModelViewSet):
    serializer_class = QuoteSerializer
    queryset = Quote.objects.all()
    permission_classes = (QuotePermission,)
    action_serializers = {
        'retrieve': QuoteSerializer,
        'list': QuoteSerializer,
        'create': QuoteSerializer,
        'update': QuoteUpdateSerializer,
        'partial_update': QuoteUpdateRatingSerializer
    }

    def get_queryset(self):
        queryset = super(QuoteViewSet, self).get_queryset()
        if not self.request.user.is_staff:
            return queryset.filter(status='mod')
        return queryset

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            return self.action_serializers.get(self.action, self.serializer_class)
        return super(QuoteViewSet, self).get_serializer_class()

    @action(detail=True, methods=['patch'], url_path='rate-plus', permission_classes=[AllowAny])
    def rate_plus(self, request, pk=None):
        print(request.data['value'])
        quote = self.get_object()
        rated = self.request.session.get('rated', [])
        if not rated:
            self.request.session['rated'] = []
        if quote.pk not in rated:
            if request.data['value'] == 'plus':
                quote.rating += 1
                quote.save()
            else:
                quote.rating -= 1
                quote.save()
            self.request.session['rated'].append(quote.pk)
            self.request.session.modified = True
            return Response(data={'rating': self.get_object().rating})
        return Response({'message': 'Already rated'})
