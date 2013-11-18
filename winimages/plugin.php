	<?php 
		/*
		Plugin Name: Win 8 Images
		Plugin URI: http://www.thebitchwhocodes.com
		Description: Plugin for creating a zip file of all the the image sizes you need
		Author: S Mulcahy
		Version: 1.0
		Author URI: http://www.thebitchwhocodes.com
		*/

		/* put this in the option menu*/
		function win_admin_actions() {
			add_management_page("Win 8 Images", "Win 8 Images", 1, "Win8_Images","win_admin");
		}

		add_action('admin_menu', 'win_admin_actions');

		function win_admin()
		{

			include('win_admin.php');

		}


function my_enqueue($hook) {
	
    if( 'tools_page_Win8_Images' != $hook )
        return;
    	wp_enqueue_media();
    	wp_register_script('admin-js', plugin_dir_url( __FILE__ ) . '/js/admin.js', array('jquery'));
    	wp_enqueue_script( 'my_custom_script', plugin_dir_url( __FILE__ ) . '/js/admin.js' );
    	$data = array('save_path' =>plugin_dir_url( __FILE__ ),'plugin_url'=>WP_PLUGIN_DIR);
		wp_localize_script('my_custom_script', 'php_data', $data);
    
    	  wp_register_style( 'prefix-style', plugins_url('/css/win8style.css', __FILE__) );
    	wp_enqueue_style( 'prefix-style' );
	}
	add_action( 'admin_enqueue_scripts', 'my_enqueue' );

	?>