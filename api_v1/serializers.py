from rest_framework import serializers

from quotes.models import Quote


class QuoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quote
        fields = ['id', 'text', 'name', 'email', 'rating', 'status', 'created_at']
        read_only_fields = ['rating', 'status']


class QuoteUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ['id', 'text', 'status']


class QuoteUpdateRatingSerializer(serializers.ModelSerializer):
    rating = serializers.ReadOnlyField()

    class Meta:
        model = Quote
        fields = ['id', 'rating']
