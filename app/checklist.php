<?php

$path = 'checklist';

date_default_timezone_set('America/Sao_Paulo');

if (isset($_GET) && ($_GET['m'] == 'save')) {
  @mkdir("{$path}", 0777, true);
  @chmod("{$path}", 0777);

  $data = file_get_contents("php://input");
  $myfile = fopen("{$path}/checklist_" . date('Y_m_d_H_i_s') . "_" . rand() . ".txt", "w") or die("Unable to open file!");
  fwrite($myfile, $data);
  fclose($myfile);
}
elseif (isset($_GET) && ($_GET['m'] == 'get')) {
  if ($handle = opendir('checklist')) {
    $latest_ctime = 0;
    $latest_filename = '';

    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
      $filepath = "{$path}/{$entry}";

      if (is_file($filepath) && filectime($filepath) > $latest_ctime) {
        $latest_ctime = filectime($filepath);
        $latest_filename = $entry;
      }
    }
    closedir($handle);

    echo file_get_contents("{$path}/{$latest_filename}");
  }
}
