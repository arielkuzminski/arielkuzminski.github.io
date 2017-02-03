<?php

header( 'Content-Type: application/json' );
/*
Użycie: 
	add: json.php?action=add&title={title}&description={desc}&type={movie/show}&lasts={lasts}&image={image}&year={year}
	
	show: json.php?action=show (pokazuje wszystkie rekordy)
	show: json.php?action=show&id={id} (pokazuje tylko post o wybranym ID)

*/
$db = new PDO('mysql:host=webpros.nazwa.pl;dbname=webpros_15;charset=utf8', 'webpros_15', 'PfigFront1');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$action = $_REQUEST['action'];
$ret = [ 'status' => 'error' ];
switch( $action ) {
	case 'show':
		$add = '';
		if(isset($_REQUEST['id'])) {
			$add = " WHERE `id` = {$_REQUEST['id']}";
		}
		$result = $db->query('SELECT * FROM `arielkuzminski` ORDER BY `score` DESC' . $add);
		$rows = $result->fetchAll(PDO::FETCH_ASSOC);
		$ret['posts'] = $rows;
		$ret['status'] = 'ok';
		break;
	case 'add':
		$stmt = $db->prepare("INSERT INTO arielkuzminski( name, score) VALUES(:name, :score)");
		$stmt->execute(	array(	
								':name' => $_REQUEST['name'],
								':score' => $_REQUEST['score'] )
						);
		if( $stmt->rowCount() ) {
			$ret['status'] = 'ok';
			$ret['rows'] = $stmt->rowCount();
		} else {
            $ret['error'] = $db->errorInfo();
        }
		break;
}

echo json_encode($ret);