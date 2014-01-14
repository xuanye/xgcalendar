seajs.config({
  alias: {
      'jquery': 'lib/jquery/1.6/jquery.js',
      'form': 'plugin/jquery.form.js',
      'datepicker': 'plugin/jquery.datepicker.js',
      'validate': 'plugin/jquery.validate.js',
      'dropdown': 'plugin/jquery.dropdown.js',
      'dailog': 'plugin/jquery.ifrmdailog.js'          
  },
  preload: [
   'jquery',
   'common' 
  ],
  debug: true,
  map: [
    [/^(.*\/static\/js\/page\/.*\.(?:js))(?:.*)$/i, '$1?2013010801'],
    [/^(.*\/static\/js\/plugin\/.*\.(?:js))(?:.*)$/i, '$1?2013010801']
  ],
  //base: 'http://example.com/path/to/libs/',
  charset: 'utf-8',
  timeout: 20000
});