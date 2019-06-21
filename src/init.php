<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package GutenGraphs
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. Google Charts.
 * 2. blocks.style.build.css - Frontend + Backend.
 * 3. blocks.build.js - Backend.
 * 4. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function gutengraphs_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'gutengraphs-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);

	// Register block editor script for backend.
	wp_register_script(
		'gutengraphs-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		false
	);

	// Register block editor styles for backend.
	wp_register_style(
		'gutengraphs-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);

	// Register Gutenberg block on server-side.
	register_block_type(
		'gutengraphs/barchart', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'gutengraphs-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'gutengraphs-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'gutengraphs-block-editor-css',
		)
	);

	wp_enqueue_script( 'google-charts-loader' );
	wp_enqueue_script( 'google-charts' );
}

add_action( 'init', 'gutengraphs_block_assets' );

/**
 * Add block category for Graphs.
 * 
 * @since 1.0.0
 */
function gutengraphs_add_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'gutengraphs',
				'title' => __( 'Graphs', 'gutengraphs' ),
			),
		)
	);
}

add_filter( 'block_categories', 'gutengraphs_add_block_category', 10, 2);
