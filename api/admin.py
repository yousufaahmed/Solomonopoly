#Contributors: Ahnaf
from django.contrib import admin
from myapp.models import Card, Player, Task, Purchases, Campus, PlayerTask, Gamekeeper, GamekeeperTask, Checkpoint, Trivia, Visits, TaskCheckpoint

@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ("name", "rarity", "description")
    search_fields = ("name",)
    list_filter = ("rarity",)

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ("user", "points", "campus")
    search_fields = ("user__username",)
    list_filter = ("campus",)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "points")
    search_fields = ("title",)
    list_filter = ()

@admin.register(Purchases)
class PurchasesAdmin(admin.ModelAdmin):
    list_display = ("player", "card", "purchase_time")
    list_filter = ("purchase_time", "card")

@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    list_display = ("name", "location")

@admin.register(PlayerTask)
class PlayerTaskAdmin(admin.ModelAdmin):
    list_display = ("player", "task", "completed")
    list_filter = ("completed",)
    search_fields = ("player__user__username", "task__title")

@admin.register(Gamekeeper)
class GamekeeperAdmin(admin.ModelAdmin):
    list_display = ("name", "campus")

@admin.register(GamekeeperTask)
class GamekeeperTaskAdmin(admin.ModelAdmin):
    list_display = ("gamekeeper", "task")

@admin.register(Checkpoint)
class CheckpointAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "type", "campus")
    list_filter = ("type", "campus")

@admin.register(Trivia)
class TriviaAdmin(admin.ModelAdmin):
    list_display = ("name", "description")

@admin.register(Visits)
class VisitsAdmin(admin.ModelAdmin):
    list_display = ("player", "checkpoint", "visited_time")

@admin.register(TaskCheckpoint)
class TaskCheckpointAdmin(admin.ModelAdmin):
    list_display = ("task", "checkpoint")

