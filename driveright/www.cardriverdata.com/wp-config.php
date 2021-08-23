<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'apexsinc_QW2dz3w62gbEjthqh');

/** MySQL database username */
define('DB_USER', 'apexsinc_jay');

/** MySQL database password */
define('DB_PASSWORD', 'password');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '-Fyi@aD*5;b%O.xjWsY+rpel/9tmGzi7bWR`ON7DWrc)a]_jQ~3$^UD}QSOs:dvP');
define('SECURE_AUTH_KEY',  '];DcwCp8Q0l@hH?TL{`,%8H+G!%DI<wk3nBj*XVrui.!(0cny.xbU%!8}x0eZSSU');
define('LOGGED_IN_KEY',    'L(Ow3~RCuWtq}QQPjVi37DxZsw8#!<8=/NAQz9U(TK?b;)|ei>F,gRC1|TZ6-.S1');
define('NONCE_KEY',        'b$v^T(^{p;3ZUd;G<V!$x`Q~ci!-#.u7(|eDEmQMCpXDZ<qj+vMh]q)#DD<tFWH~');
define('AUTH_SALT',        'd$oGtuC2N5~mXMo<6^YJ8xT@7:Obt<M!kZq jgDvyS42HV6YI=6,[5yRL3Y_{cwJ');
define('SECURE_AUTH_SALT', '}xbR]GHc/9{N]Zz=1CSqcnamg;SsRKi#5? &*%T_%UfK6Pn:7*p}GQ@f_bix}~J.');
define('LOGGED_IN_SALT',   'yS-,QCUDHXHtvU}5Qk.E2j8)}:j>MN%7bD.CBk.8%{A_*9(Ddl(qX?V6W^;~,8VA');
define('NONCE_SALT',       '67rsm(Ocn#*MX%x3waz!VJVVu~{JeshZE5zvqp&iN9sK]sAim~!Qe[jt02D+=]ie');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
