from django.test import TestCase
from django.contrib.auth.models import User
from myapp.models import Player, Campus, Task, Trivia, Card
from api.serializers import PlayerSerializer, LeaderboardSerializer, TriviaSerializer, CampusSerializer, TaskSerializer, CardSerializer

class PlayerSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.campus = Campus.objects.create(name='Test Campus', location='Test Location')
        self.player = Player.objects.create(user=self.user, points=100, campus=self.campus)

    def test_player_serialization(self):
        serializer = PlayerSerializer(self.player)
        data = serializer.data
        self.assertEqual(data['username'], 'testuser')
        self.assertEqual(data['points'], 100)
        self.assertEqual(data['campus'], self.campus.campus_id)


class LeaderboardSerializerTest(TestCase):
    def setUp(self):
        users = [User.objects.create_user(username=f'user{i}', password=f'pass{i}') for i in range(3)]
        self.campus = Campus.objects.create(name='Test Campus')
        self.players = [
            Player.objects.create(user=users[0], points=100, campus=self.campus),
            Player.objects.create(user=users[1], points=90, campus=self.campus),
            Player.objects.create(user=users[2], points=80, campus=self.campus)
        ]

    def test_rank_calculation(self):
        queryset = Player.objects.order_by('-points')
        serializer = LeaderboardSerializer(queryset, many=True)
        self.assertEqual(serializer.data[0]['rank'], 1)
        self.assertEqual(serializer.data[1]['rank'], 2)
        self.assertEqual(serializer.data[2]['rank'], 3)
        
class CampusSerializerTest(TestCase):
    def test_campus_serialization(self):
        campus = Campus.objects.create(name='Test Campus', location='Test Location')
        serializer = CampusSerializer(campus)
        self.assertEqual(serializer.data['name'], 'Test Campus')
        
class TaskSerializerTest(TestCase):
    def test_task_serialization(self):
        task = Task.objects.create(title='Test Task', description='Test Desc', kind='QR', points=10)
        serializer = TaskSerializer(task)
        self.assertEqual(serializer.data['title'], 'Test Task')
        
class TriviaSerializerTest(TestCase):
    def test_trivia_serialization(self):
        trivia = Trivia.objects.create(name='Test Trivia', description='Test Description')
        serializer = TriviaSerializer(trivia)
        self.assertEqual(serializer.data['name'], 'Test Trivia')
        
class CardSerializerTest(TestCase):
    def test_card_serialization(self):
        card = Card.objects.create(name='Test Card', description='Test Desc', rarity='Common')
        serializer = CardSerializer(card)
        self.assertEqual(serializer.data['name'], 'Test Card')