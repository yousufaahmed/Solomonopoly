# Contributors: Ahnaf, Ernest
from django.test import TestCase
from django.contrib.auth.models import User
from myapp.models import *
from api.serializers import *

class PlayerSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.campus = Campus.objects.create(name='Test Campus', location='Test Location')
        self.player = Player.objects.create(user=self.user, points=100, campus=self.campus)

    def test_player_serialization(self):
        serializer = PlayerSerializer(self.player)
        self.assertEqual(serializer.data['username'], 'testuser')
        self.assertEqual(serializer.data['points'], 100)
        self.assertEqual(serializer.data['campus'], self.campus.campus_id)


class PlayerIdOnlySerializerTest(TestCase):
    def test_player_id_only_serialization(self):
        user = User.objects.create_user(username='u', password='p')
        campus = Campus.objects.create(name='C', location='L')
        player = Player.objects.create(user=user, campus=campus, logo='logo.png')
        serializer = PlayerIdOnlySerializer(player)
        self.assertEqual(serializer.data['player_id'], player.player_id)
        self.assertEqual(serializer.data['logo'], 'logo.png')


class LeaderboardSerializerTest(TestCase):
    def setUp(self):
        users = [User.objects.create_user(username=f'user{i}', password=f'pass{i}') for i in range(3)]
        campus = Campus.objects.create(name='Test Campus', location='Test Location')
        self.players = [
            Player.objects.create(user=users[0], points=100, campus=campus),
            Player.objects.create(user=users[1], points=90, campus=campus),
            Player.objects.create(user=users[2], points=80, campus=campus)
        ]

    def test_rank_calculation(self):
        serializer = LeaderboardSerializer(Player.objects.order_by('-points'), many=True)
        self.assertEqual(serializer.data[0]['rank'], 1)
        self.assertEqual(serializer.data[1]['rank'], 2)
        self.assertEqual(serializer.data[2]['rank'], 3)


class TaskBoardSerializerTest(TestCase):
    def test_task_board_serialization(self):
        tag = Tag.objects.create(name='tag')
        user = User.objects.create(username='p')
        campus = Campus.objects.create(name="Test Campus", location="Test Location")
        player = Player.objects.create(user=user, campus=campus)
        task = Task.objects.create(title='Task', description='Desc', points=10, count=3)
        task.tags.add(tag)
        pt = PlayerTask.objects.create(player=player, task=task)
        serializer = TaskBoardSerializer(pt)
        self.assertEqual(serializer.data['title'], 'Task')
        self.assertIn('tags', serializer.data)


class CampusSerializerTest(TestCase):
    def test_campus_serialization(self):
        campus = Campus.objects.create(name='Test Campus', location='Test Location')
        serializer = CampusSerializer(campus)
        self.assertEqual(serializer.data['name'], 'Test Campus')


class TriviaSerializerTest(TestCase):
    def test_trivia_serialization(self):
        trivia = Trivia.objects.create(name='Trivia', description='Desc')
        serializer = TriviaSerializer(trivia)
        self.assertEqual(serializer.data['name'], 'Trivia')


class TagSerializerTest(TestCase):
    def test_tag_serialization(self):
        tag = Tag.objects.create(name='Taggy')
        serializer = TagSerializer(tag)
        self.assertEqual(serializer.data['name'], 'Taggy')


class TaskSerializerTest(TestCase):
    def test_task_serialization(self):
        tag = Tag.objects.create(name='tag1')
        task = Task.objects.create(title='Task', description='D', points=5)
        task.tags.add(tag)
        serializer = TaskSerializer(task)
        self.assertEqual(serializer.data['title'], 'Task')


class CardSerializerTest(TestCase):
    def test_card_serialization(self):
        card = Card.objects.create(name='Card', description='D', rarity='Common')
        serializer = CardSerializer(card)
        self.assertEqual(serializer.data['name'], 'Card')


class GamekeeperTaskSerializerTest(TestCase):
    def test_gamekeeper_task_serialization(self):
        campus = Campus.objects.create(name='C')
        gk = Gamekeeper.objects.create(name='GK', password='x', campus=campus)
        task = Task.objects.create(title='T')
        gktask = GamekeeperTask.objects.create(gamekeeper=gk, task=task)
        serializer = GamekeeperTaskSerializer(gktask)
        self.assertEqual(serializer.data['task']['title'], 'T')


class PlayerTaskSerializerTest(TestCase):
    def test_create_and_serialize(self):
        user = User.objects.create(username='u')
        campus = Campus.objects.create(name="Test Campus", location="Test Location")
        player = Player.objects.create(user=user, campus=campus)
        task = Task.objects.create(title='t')
        data = {'player': player, 'task': task}
        serializer = PlayerTaskSerializer(data=data)
        serializer.is_valid()


class PurchasesSerializerTest(TestCase):
    def test_purchase_serialization(self):
        user = User.objects.create(username='u')
        campus = Campus.objects.create(name="Test Campus", location="Test Location")
        player = Player.objects.create(user=user, campus=campus)
        card = Card.objects.create(name='C')
        purchase = Purchases.objects.create(player=player, card=card)
        serializer = PurchasesSerializer(purchase)
        self.assertEqual(serializer.data['card'], card.card_id)


class VisitsSerializerTest(TestCase):
    def test_visits_serialization(self):
        user = User.objects.create(username='x')
        campus = Campus.objects.create(name="Test Campus", location="Test Location")
        player = Player.objects.create(user=user, campus=campus)
        cp = Checkpoint.objects.create(name='CP', location='L', campus=campus)
        visit = Visits.objects.create(player=player, checkpoint=cp)
        serializer = VisitsSerializer(visit)
        self.assertEqual(serializer.data['checkpoint'], cp.checkpoint_id)


class TaskCheckpointSerializerTest(TestCase):
    def test_serialization(self):
        t = Task.objects.create(title='T')
        campus = Campus.objects.create(name="Test Campus", location="Test Location")
        cp = Checkpoint.objects.create(name="CP", location="L", campus=campus)
        tc = TaskCheckpoint.objects.create(task=t, checkpoint=cp)
        serializer = TaskCheckpointSerializer(tc)
        self.assertEqual(serializer.data['task'], t.task_id)


class UserSerializerTest(TestCase):
    def test_user_create(self):
        data = {'username': 'x', 'password': 'p'}
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.assertTrue(User.objects.filter(username='x').exists())
        self.assertTrue(Player.objects.filter(user__username='x').exists())


class AchievementSerializerTest(TestCase):
    def test_serialization(self):
        tag = Tag.objects.create(name='a')
        a = Achievement.objects.create(name='A', count=1)
        a.tags.add(tag)
        serializer = AchievementSerializer(a)
        self.assertEqual(serializer.data['name'], 'A')


class PlayerAchievementSerializerTest(TestCase):
    def test_create(self):
        user = User.objects.create(username='x')
        campus = Campus.objects.create(name="Test Campus", location="Test Location")
        player = Player.objects.create(user=user, campus=campus)
        a = Achievement.objects.create(name='A', count=1)
        serializer = PlayerAchievementSerializer(data={'player': player.pk, 'achievement': a.pk})
        serializer.is_valid()


class PlayerUpdateLogoSerializerTest(TestCase):
    def test_logo_update(self):
        user = User.objects.create(username='a')
        campus = Campus.objects.create(name="Test Campus", location="Test Location")
        player = Player.objects.create(user=user, campus=campus, logo='x.png')
        serializer = PlayerUpdateLogoSerializer(player, data={'logo': 'y.png'})
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.assertEqual(player.logo, 'y.png')
