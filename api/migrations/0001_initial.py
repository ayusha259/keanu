# Generated by Django 4.0.5 on 2022-06-15 15:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('title', models.CharField(max_length=200)),
                ('price', models.DecimalField(decimal_places=2, max_digits=9)),
                ('brand', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=50)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('isOffer', models.BooleanField(default=False)),
                ('description', models.TextField(blank=True, null=True)),
                ('countInStock', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(db_index=True, editable=False, primary_key=True, serialize=False, unique=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
