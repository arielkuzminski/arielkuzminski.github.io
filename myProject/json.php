<?php

$action = $_GET['action'];

switch( $action ) {
	case 'login': {
		$avaibleUsers = array( 'admin@gmail.com', 'user@gmail.com', 'test@gmail.com', 'superadmin@gmail.com', 'operator@gmail.com' );
		$password = 'superTajneHaslo';
		
		if( in_array( $_REQUEST['email'], $avaibleUsers ) && $password == $_REQUEST['password'] ) {
			die( json_encode( array( 'status' => 'ok', 'login' => $_REQUEST['email'] ) ) );
		} else {
			die( json_encode( array( 'status' => 'error', 'message' => 'Podano niepoprawny login.' ) ) );
		}
		break;
	}
	case 'search': {
		$avaibleWords = array( 'abażur', 'antylopa', 'aikido', 'anna', 'celina', 'cebula', 'całka', 'cel', 'cynamon', 'cerata' );
		
		if( in_array( $_REQUEST['word'], $avaibleWords ) ) {
			die( json_encode( array( 'status' => 'ok', 'word' => $_REQUEST['word'] ) ) );
		} else {
			die( json_encode( array( 'status' => 'error', 'message' => 'Brak szukanego słowa.' ) ) );
		}
		break;
	}
	case 'posts': {
		$num = $_REQUEST['num'];
		$posts = array('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor efficitur nisi in suscipit. Nullam maximus libero sed risus maximus, a tincidunt justo tincidunt. Fusce id blandit risus. Maecenas maximus ac tortor et sagittis. Vivamus vestibulum varius urna, eget vulputate eros tempor vel. Phasellus dictum sapien vitae nibh elementum malesuada. Proin quis elit ante.',

		'Vivamus vel posuere turpis. Mauris leo metus, elementum et augue at, varius pulvinar nisi. Nunc sit amet nibh et tellus pharetra lacinia. Pellentesque eu est turpis. Pellentesque mauris eros, tincidunt et sem quis, tincidunt sodales nunc. Pellentesque condimentum dui aliquam, dictum nunc finibus, lobortis tortor. Donec rhoncus orci aliquet, rutrum quam non, tincidunt diam. Sed non massa a neque dignissim bibendum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras auctor, enim ac aliquam ultrices, risus justo faucibus orci, eleifend aliquam arcu eros et massa. Nunc egestas leo sit amet ultrices euismod. Nullam nec finibus lacus. Vivamus quam dolor, maximus quis nunc nec, sodales malesuada ipsum.',

		'Vestibulum fringilla vel ex at fermentum. Praesent rutrum massa at ipsum vulputate condimentum. Vivamus bibendum, augue ac dignissim ullamcorper, nunc erat tempus ex, laoreet rhoncus mi orci vitae arcu. Nunc tincidunt lacus non vehicula posuere. Maecenas eu sodales sapien, at suscipit libero. Nulla ultrices vel diam a volutpat. Donec pellentesque imperdiet mauris, ut sollicitudin est sollicitudin eu. Quisque vitae ligula nibh. Donec lacinia elementum nisi, vel pulvinar neque pretium sit amet. Nulla porttitor viverra odio sodales scelerisque. Maecenas laoreet turpis a eleifend tempor.',

		'Nullam accumsan sem non lorem accumsan, quis mattis augue condimentum. Aenean pharetra, ex in tincidunt malesuada, massa ex sagittis augue, sit amet aliquet eros enim vel sem. Donec felis metus, imperdiet eget tempus a, euismod vitae erat. Nulla quis cursus eros. Curabitur rutrum nisi in orci pharetra pretium. Sed bibendum, quam eu posuere semper, neque quam dapibus ante, eget fermentum quam nibh nec lacus. Cras venenatis fringilla ex sit amet placerat. In in aliquet quam. In pretium dolor vitae aliquam aliquam. Nullam aliquam tortor sed finibus iaculis.',

		'Mauris laoreet metus et sapien vulputate, id semper mauris imperdiet. Nullam sed leo libero. Sed faucibus volutpat risus, ac laoreet ante rhoncus eget. Nulla pellentesque viverra viverra. Mauris euismod mauris et orci aliquet congue. Vivamus non elit purus. Nulla lorem felis, ornare vel elit posuere, viverra venenatis leo. Phasellus et sollicitudin turpis. Nulla et mauris ante. Nullam et dolor pretium, venenatis dolor eget, finibus nulla. ');
		$postsArray = array();
		
		if( $num > 0 ) {
			for($i = 0; $i < $num; $i++) {
				$postsArray[] = $posts[ $num % count($posts) ];
			}
			die( json_encode( array( 'status' => 'ok', 'posts' => $postsArray ) ) );
		} else {
			die( json_encode( array( 'status' => 'error', 'message' => 'Niepoprawny argument.' ) ) );
		}
		
		break;
	}
	die( json_encode( array( 'status' => 'error', 'message' => 'Brak wybranej akcji!' ) ) );
}