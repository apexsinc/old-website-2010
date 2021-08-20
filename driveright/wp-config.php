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
define('DB_NAME', 'apexsinc_cardriverdata');

/** MySQL database username */
define('DB_USER', 'apexsinc_jr');

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
define('AUTH_KEY',         'Vo6@-Xg4UASb5#V|M{$G|i0R_ k`z[Upwm<..8(:1ctCQ`c&l996GJtK: H!XnJn');
define('SECURE_AUTH_KEY',  '|YiT/=I2u5y >$d!}&}{l+@h!;>qcq=J)eq-j(l;@6b&V-]9ilqiuLRL+pNXB5e%');
define('LOGGED_IN_KEY',    'Y#^8VK>Y:e]+7I?;ICpG>H,}lT8^?U^e2Ny?}Q?O.Fo3S&_3T{d?_A+j|)dx?&gf');
define('NONCE_KEY',        '!:r,3L6:D!FgA-<pCs;!v/s%If-,p`:CRxqxUWni5sBGOS5Z0MlWn %=bCOKhTs!');
define('AUTH_SALT',        '5ZjP~Q@3FbSTy_D 1d?/V`ghJC(oTNZ9}&jlurV$ct3R-0~ZBXeRAT/8ZOL!aE/|');
define('SECURE_AUTH_SALT', 'gjV:Fk6wA|JDaR/c`5toRy{=3Du&nv1xkrm{d2tYW,wMQk^X!,n8 vK(Eg|yst(8');
define('LOGGED_IN_SALT',   'OJdE=tijx<Nxp:`i[=N}%r:UApU86.]9U%J!^ E|tLS/p]#I;+5|f%VN2t-z/``<');
define('NONCE_SALT',       'TcsTh! C3di[?|g.^_%P,bS*k(Qe]{]Wf3m*(!twel$r;gKgWRM@~6(6U }W(B^H');

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
