# Generated by Django 3.2.4 on 2021-06-11 14:43

from django.db import migrations
import django_editorjs_fields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_article_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=django_editorjs_fields.fields.EditorJsJSONField(blank=True, null=True),
        ),
    ]
