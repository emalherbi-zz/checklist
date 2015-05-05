<?php

date_default_timezone_set('America/Sao_Paulo');

defined("PS"  ) || define("PS", PATH_SEPARATOR);
defined("DS"  ) || define("DS", DIRECTORY_SEPARATOR);
defined("ROOT") || define("ROOT", dirname(dirname(dirname(__FILE__))));

$path = ROOT . DS . 'checklist';
@mkdir("{$path}", 0777, true);
@chmod("{$path}", 0777);

if (isset($_GET) && ($_GET['m'] == 'all')) {

  $itens = array();
  if ($handle = @opendir("{$path}")) {
    while (false !== ($file = readdir($handle))) {
      $filepath = "{$path}/{$file}";

      if (is_file($filepath)) {
        $item = new stdClass();
        $item->file = $file;
        $item->contents = json_decode(file_get_contents("{$path}/{$file}"));
        $itens[] = $item;
      }
    }
    closedir($handle);
  }
  sort($itens);
  echo json_encode($itens);

} elseif (isset($_GET) && ($_GET['m'] == 'create')) {

  try {
    if ($handle = @opendir("{$path}")) {
      while (false !== ($file = readdir($handle))) {
        $filepath = "{$path}/{$file}";

        if (is_file($filepath)) {
          $contents = file_get_contents("{$filepath}");
          $contents = json_decode($contents);
          $contents->use = "false";
          $contents = json_encode($contents);

          $file = fopen("{$filepath}", "w");
          fwrite($file, $contents);
          fclose($file);
        }
      }
      closedir($handle);
    }

    $name = $_GET['f'];
    $nameFile = date('Y_m_d_H_i_s') . "_" . rand();

    $file = fopen("{$path}/$nameFile.txt", "w");
    fwrite($file, '{"title":"'.$name.'","use": "true","itens":[]}');
    fclose($file);

    echo true;
  } catch (Exception $e) {
    echo false;
  }

} elseif (isset($_GET) && ($_GET['m'] == 'use')) {

  try {
    if ($handle = @opendir("{$path}")) {
      while (false !== ($file = readdir($handle))) {
        $filepath = "{$path}/{$file}";

        if (is_file($filepath)) {
          $contents = file_get_contents("{$filepath}");
          $contents = json_decode($contents);
          $contents->use = "false";
          $contents = json_encode($contents);

          $file = fopen("{$filepath}", "w");
          fwrite($file, $contents);
          fclose($file);
        }
      }
      closedir($handle);
    }

    $name = $_GET['f'];
    $contents = file_get_contents("{$path}/$name");
    $contents = json_decode($contents);
    $contents->use = "true";
    $contents = json_encode($contents);

    $file = fopen("{$path}/$name", "w");
    fwrite($file, $contents);
    fclose($file);

    echo true;
  } catch (Exception $e) {
    echo false;
  }

} elseif (isset($_GET) && ($_GET['m'] == 'duplicate')) {

  try {
    if ($handle = @opendir("{$path}")) {
      while (false !== ($file = readdir($handle))) {
        $filepath = "{$path}/{$file}";

        if (is_file($filepath)) {
          $contents = file_get_contents("{$filepath}");
          $contents = json_decode($contents);
          $contents->use = "false";
          $contents = json_encode($contents);

          $file = fopen("{$filepath}", "w");
          fwrite($file, $contents);
          fclose($file);
        }
      }
      closedir($handle);
    }

    $name = $_GET['f'];
    $contents = file_get_contents("{$path}/$name");
    $contents = json_decode($contents);
    $contents->use = "true";
    $contents = json_encode($contents);

    $nameFile = date('Y_m_d_H_i_s') . "_" . rand();
    $file = fopen("{$path}/$nameFile.txt", "w");
    fwrite($file, $contents);
    fclose($file);

    echo true;
  } catch (Exception $e) {
    echo false;
  }

} elseif (isset($_GET) && ($_GET['m'] == 'delete')) {

  try {
    $name = $_GET['f'];
    echo unlink("{$path}/$name");
  } catch (Exception $e) {
    echo false;
  }

}
