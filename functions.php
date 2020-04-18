<?php

function my_theme_enqueue_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', [ 'parent-style' ], wp_get_theme()->get( 'Version' ) );

	wp_enqueue_script( 'movies-script', get_stylesheet_directory_uri() . '/js/scripts.js', [ 'jquery' ], NULL, TRUE );

	wp_localize_script( 'movies-script', 'movies', [
		'adminAjax' => admin_url( 'admin-ajax.php' ),
	] );
}

add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

function find_movie() {
	$movies_found = [];

	if ( isset( $_POST['query'] ) && ! empty( $_POST['query'] ) ) {
		$args = [
			'post_type'   => 'peliculas',
			'post_status' => 'publish',
			's'           => $_POST['query'],
		];

		$movies = get_posts( $args );

		foreach ( $movies as $movie ) {
			$movies_found[] = [
				'title'   => $movie->post_title,
				'content' => $movie->post_content,
				'image'   => get_the_post_thumbnail_url( $movie->ID ),
				'link'    => get_permalink( $movie->ID ),
			];
		}
	}

	wp_send_json( $movies_found );
}

add_action( 'wp_ajax_findMovie', 'find_movie' );
add_action( 'wp_ajax_nopriv_findMovie', 'find_movie' );