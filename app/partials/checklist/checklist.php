<?php

date_default_timezone_set('America/Sao_Paulo');

defined("PS") || define("PS", PATH_SEPARATOR);
defined("DS") || define("DS", DIRECTORY_SEPARATOR);
defined("ROOT") || define("ROOT", dirname(dirname(dirname(__FILE__))));

$path = ROOT . DS . 'checklist';

@mkdir("{$path}", 0777, true);
@chmod("{$path}", 0777);

if (isset($_GET) && ($_GET['m'] == 'save')) {
  try {
    $files = json_decode(file_get_contents("php://input"));
    $file  = $files[0]->file;

    $filepath = "{$path}/{$file}";
    $f = fopen("{$filepath}", "w");
    fwrite($f, json_encode($files[0]->contents));
    fclose($f);

    echo true;
  } catch (Exception $e) {
    echo false;
  }
}
elseif (isset($_GET) && ($_GET['m'] == 'all')) {

  $itens = array();
  if ($handle = @opendir("{$path}")) {
    while (false !== ($file = readdir($handle))) {
      $filepath = "{$path}/{$file}";

      if (is_file($filepath)) {
        $item = new stdClass();
        $item->file = $file;
        $item->contents = json_decode(file_get_contents("{$filepath}"));

        if ($item->contents->use=="true") {
          $itens[] = $item;
        }
      }
    }
    closedir($handle);
  }
  echo json_encode($itens);

}
