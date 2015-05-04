<?php

date_default_timezone_set('America/Sao_Paulo');

defined("PS") || define("PS", PATH_SEPARATOR);
defined("DS") || define("DS", DIRECTORY_SEPARATOR);
defined("ROOT") || define("ROOT", dirname(dirname(dirname(__FILE__))));

$path = ROOT . DS . 'checklist';
$file = 'default.txt';
$filepath = "{$path}" . DS . "{$file}";

@mkdir("{$path}", 0777, true);
@chmod("{$path}", 0777);

if (isset($_GET) && ($_GET['m'] == 'save')) {
  $data = file_get_contents("php://input");

  $myfile = fopen("{$filepath}", "w") or die("Unable to open file!");
  fwrite($myfile, $data);
  fclose($myfile);

  if ($_GET['n'] == "true") {
    $myfile = fopen("{$path}/checklist_" . date('Y_m_d_H_i_s') . "_" . rand(10, 5000) . ".txt", "w") or die("Unable to open file!");
    fwrite($myfile, $data);
    fclose($myfile);
  }
}
elseif (isset($_GET) && ($_GET['m'] == 'get')) {
  if ($handle = @opendir("{$path}")) {
    if (is_file($filepath)) {
      echo file_get_contents($filepath);
    }
  }

  /*
  if ($handle = @opendir("{$path}")) {
    $time = 0;
    $file = '';

    while (false !== ($entry = readdir($handle))) {
      $filepath = "{$path}/{$entry}";

      if (is_file($filepath) && filectime($filepath) > $time) {
        $time = filectime($filepath);
        $file = $entry;
      }
    }
    closedir($handle);
    echo file_get_contents("{$path}/{$file}");
  }
  */
}
