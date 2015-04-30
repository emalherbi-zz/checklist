<?php

date_default_timezone_set('America/Sao_Paulo');

defined("PS"  ) || define("PS", PATH_SEPARATOR);
defined("DS"  ) || define("DS", DIRECTORY_SEPARATOR);
defined("ROOT") || define("ROOT", dirname(dirname(dirname(__FILE__))));

$path     = ROOT . DS . 'checklist';
$filepath = "{$path}" . DS . "{$file}";

@mkdir("{$path}", 0777, true);
@chmod("{$path}", 0777);

if (isset($_GET) && ($_GET['m'] == 'get')) {

  if ($handle = @opendir("{$path}")) {

    $itens = array();
    while (false !== ($file = readdir($handle))) {
      $filepath = "{$path}/{$file}";

      if (is_file($filepath)) {
        $item = new stdClass();
        $item->file = $file;
        $item->contents = json_decode(file_get_contents("{$path}/{$file}"));

        if (strpos($item->file,'default') === false) {
          $itens[] = $item;
        }
      }
    }
    closedir($handle);
    echo json_encode($itens);
  }
}
