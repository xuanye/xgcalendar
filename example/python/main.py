import logging, os, sys

# Google App Engine imports.
from google.appengine.ext.webapp import util

# Remove the standard version of Django.
for k in [k for k in sys.modules if k.startswith('django')]:
  del sys.modules[k]

# Force sys.path to have our own directory first, in case we want to import
# from it.
if os.name=='nt':
    os.unlink=lambda :None

# Add Django 1.1 archive to the path.
django_path = 'django.zip'
sys.path.insert(0, django_path)

# Must set this env var *before* importing any part of Django
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi
import django.core.signals
import django.db
import django.dispatch.dispatcher

def log_exception(*args, **kwds):
    logging.exception('Exception in request:')
    # Log errors.
    django.dispatch.dispatcher.connect(log_exception, django.core.signals.got_request_exception)
    # Unregister the rollback event handler.
    django.dispatch.dispatcher.disconnect(django.db._rollback_on_exception,django.core.signals.got_request_exception)

def main():
  # Re-add Django 1.0 archive to the path, if needed.
  if django_path not in sys.path:
    sys.path.insert(0, django_path)

  # Create a Django application for WSGI.
  application = django.core.handlers.wsgi.WSGIHandler()

  # Run the WSGI CGI handler with that application.
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()
