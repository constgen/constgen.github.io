-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 19, 2011 at 01:16 PM
-- Server version: 5.1.40
-- PHP Version: 5.2.12

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `intersog_mobile`
--

-- --------------------------------------------------------

--
-- Table structure for table `bak_banner`
--

CREATE TABLE IF NOT EXISTS `bak_banner` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL DEFAULT '0',
  `type` varchar(30) NOT NULL DEFAULT 'banner',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `imptotal` int(11) NOT NULL DEFAULT '0',
  `impmade` int(11) NOT NULL DEFAULT '0',
  `clicks` int(11) NOT NULL DEFAULT '0',
  `imageurl` varchar(100) NOT NULL DEFAULT '',
  `clickurl` varchar(200) NOT NULL DEFAULT '',
  `date` datetime DEFAULT NULL,
  `showBanner` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `editor` varchar(50) DEFAULT NULL,
  `custombannercode` text,
  `catid` int(10) unsigned NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `sticky` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `publish_up` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_down` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tags` text NOT NULL,
  `params` text NOT NULL,
  PRIMARY KEY (`bid`),
  KEY `viewbanner` (`showBanner`),
  KEY `idx_banner_catid` (`catid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_banner`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_bannerclient`
--

CREATE TABLE IF NOT EXISTS `bak_bannerclient` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `contact` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `extrainfo` text NOT NULL,
  `checked_out` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out_time` time DEFAULT NULL,
  `editor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_bannerclient`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_bannertrack`
--

CREATE TABLE IF NOT EXISTS `bak_bannertrack` (
  `track_date` date NOT NULL,
  `track_type` int(10) unsigned NOT NULL,
  `banner_id` int(10) unsigned NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_bannertrack`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_categories`
--

CREATE TABLE IF NOT EXISTS `bak_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT '',
  `section` varchar(50) NOT NULL DEFAULT '',
  `image_position` varchar(30) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `editor` varchar(50) DEFAULT NULL,
  `ordering` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cat_idx` (`section`,`published`,`access`),
  KEY `idx_access` (`access`),
  KEY `idx_checkout` (`checked_out`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_categories`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_components`
--

CREATE TABLE IF NOT EXISTS `bak_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `link` varchar(255) NOT NULL DEFAULT '',
  `menuid` int(11) unsigned NOT NULL DEFAULT '0',
  `parent` int(11) unsigned NOT NULL DEFAULT '0',
  `admin_menu_link` varchar(255) NOT NULL DEFAULT '',
  `admin_menu_alt` varchar(255) NOT NULL DEFAULT '',
  `option` varchar(50) NOT NULL DEFAULT '',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `admin_menu_img` varchar(255) NOT NULL DEFAULT '',
  `iscore` tinyint(4) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `parent_option` (`parent`,`option`(32))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `bak_components`
--

INSERT INTO `bak_components` (`id`, `name`, `link`, `menuid`, `parent`, `admin_menu_link`, `admin_menu_alt`, `option`, `ordering`, `admin_menu_img`, `iscore`, `params`, `enabled`) VALUES
(1, 'Banners', '', 0, 0, '', 'Banner Management', 'com_banners', 0, 'js/ThemeOffice/component.png', 0, 'track_impressions=0\ntrack_clicks=0\ntag_prefix=\n\n', 1),
(2, 'Banners', '', 0, 1, 'option=com_banners', 'Active Banners', 'com_banners', 1, 'js/ThemeOffice/edit.png', 0, '', 1),
(3, 'Clients', '', 0, 1, 'option=com_banners&c=client', 'Manage Clients', 'com_banners', 2, 'js/ThemeOffice/categories.png', 0, '', 1),
(4, 'Web Links', 'option=com_weblinks', 0, 0, '', 'Manage Weblinks', 'com_weblinks', 0, 'js/ThemeOffice/component.png', 0, 'show_comp_description=1\ncomp_description=\nshow_link_hits=1\nshow_link_description=1\nshow_other_cats=1\nshow_headings=1\nshow_page_title=1\nlink_target=0\nlink_icons=\n\n', 1),
(5, 'Links', '', 0, 4, 'option=com_weblinks', 'View existing weblinks', 'com_weblinks', 1, 'js/ThemeOffice/edit.png', 0, '', 1),
(6, 'Categories', '', 0, 4, 'option=com_categories&section=com_weblinks', 'Manage weblink categories', '', 2, 'js/ThemeOffice/categories.png', 0, '', 1),
(7, 'Contacts', 'option=com_contact', 0, 0, '', 'Edit contact details', 'com_contact', 0, 'js/ThemeOffice/component.png', 1, 'contact_icons=0\nicon_address=\nicon_email=\nicon_telephone=\nicon_fax=\nicon_misc=\nshow_headings=1\nshow_position=1\nshow_email=0\nshow_telephone=1\nshow_mobile=1\nshow_fax=1\nbannedEmail=\nbannedSubject=\nbannedText=\nsession=1\ncustomReply=0\n\n', 1),
(8, 'Contacts', '', 0, 7, 'option=com_contact', 'Edit contact details', 'com_contact', 0, 'js/ThemeOffice/edit.png', 1, '', 1),
(9, 'Categories', '', 0, 7, 'option=com_categories&section=com_contact_details', 'Manage contact categories', '', 2, 'js/ThemeOffice/categories.png', 1, 'contact_icons=0\nicon_address=\nicon_email=\nicon_telephone=\nicon_fax=\nicon_misc=\nshow_headings=1\nshow_position=1\nshow_email=0\nshow_telephone=1\nshow_mobile=1\nshow_fax=1\nbannedEmail=\nbannedSubject=\nbannedText=\nsession=1\ncustomReply=0\n\n', 1),
(10, 'Polls', 'option=com_poll', 0, 0, 'option=com_poll', 'Manage Polls', 'com_poll', 0, 'js/ThemeOffice/component.png', 0, '', 1),
(11, 'News Feeds', 'option=com_newsfeeds', 0, 0, '', 'News Feeds Management', 'com_newsfeeds', 0, 'js/ThemeOffice/component.png', 0, '', 1),
(12, 'Feeds', '', 0, 11, 'option=com_newsfeeds', 'Manage News Feeds', 'com_newsfeeds', 1, 'js/ThemeOffice/edit.png', 0, 'show_headings=1\nshow_name=1\nshow_articles=1\nshow_link=1\nshow_cat_description=1\nshow_cat_items=1\nshow_feed_image=1\nshow_feed_description=1\nshow_item_description=1\nfeed_word_count=0\n\n', 1),
(13, 'Categories', '', 0, 11, 'option=com_categories&section=com_newsfeeds', 'Manage Categories', '', 2, 'js/ThemeOffice/categories.png', 0, '', 1),
(14, 'User', 'option=com_user', 0, 0, '', '', 'com_user', 0, '', 1, '', 1),
(15, 'Search', 'option=com_search', 0, 0, 'option=com_search', 'Search Statistics', 'com_search', 0, 'js/ThemeOffice/component.png', 1, 'enabled=0\n\n', 1),
(16, 'Categories', '', 0, 1, 'option=com_categories&section=com_banner', 'Categories', '', 3, '', 1, '', 1),
(17, 'Wrapper', 'option=com_wrapper', 0, 0, '', 'Wrapper', 'com_wrapper', 0, '', 1, '', 1),
(18, 'Mail To', '', 0, 0, '', '', 'com_mailto', 0, '', 1, '', 1),
(19, 'Media Manager', '', 0, 0, 'option=com_media', 'Media Manager', 'com_media', 0, '', 1, 'upload_extensions=bmp,csv,doc,epg,gif,ico,jpg,odg,odp,ods,odt,pdf,png,ppt,swf,txt,xcf,xls,BMP,CSV,DOC,EPG,GIF,ICO,JPG,ODG,ODP,ODS,ODT,PDF,PNG,PPT,SWF,TXT,XCF,XLS\nupload_maxsize=10000000\nfile_path=images\nimage_path=images/stories\nrestrict_uploads=1\ncheck_mime=1\nimage_extensions=bmp,gif,jpg,png\nignore_extensions=\nupload_mime=image/jpeg,image/gif,image/png,image/bmp,application/x-shockwave-flash,application/msword,application/excel,application/pdf,application/powerpoint,text/plain,application/x-zip\nupload_mime_illegal=text/html', 1),
(20, 'Articles', 'option=com_content', 0, 0, '', '', 'com_content', 0, '', 1, 'show_noauth=0\nshow_title=1\nlink_titles=0\nshow_intro=1\nshow_section=0\nlink_section=0\nshow_category=0\nlink_category=0\nshow_author=1\nshow_create_date=1\nshow_modify_date=1\nshow_item_navigation=0\nshow_readmore=1\nshow_vote=0\nshow_icons=1\nshow_pdf_icon=1\nshow_print_icon=1\nshow_email_icon=1\nshow_hits=1\nfeed_summary=0\n\n', 1),
(21, 'Configuration Manager', '', 0, 0, '', 'Configuration', 'com_config', 0, '', 1, '', 1),
(22, 'Installation Manager', '', 0, 0, '', 'Installer', 'com_installer', 0, '', 1, '', 1),
(23, 'Language Manager', '', 0, 0, '', 'Languages', 'com_languages', 0, '', 1, '', 1),
(24, 'Mass mail', '', 0, 0, '', 'Mass Mail', 'com_massmail', 0, '', 1, 'mailSubjectPrefix=\nmailBodySuffix=\n\n', 1),
(25, 'Menu Editor', '', 0, 0, '', 'Menu Editor', 'com_menus', 0, '', 1, '', 1),
(27, 'Messaging', '', 0, 0, '', 'Messages', 'com_messages', 0, '', 1, '', 1),
(28, 'Modules Manager', '', 0, 0, '', 'Modules', 'com_modules', 0, '', 1, '', 1),
(29, 'Plugin Manager', '', 0, 0, '', 'Plugins', 'com_plugins', 0, '', 1, '', 1),
(30, 'Template Manager', '', 0, 0, '', 'Templates', 'com_templates', 0, '', 1, '', 1),
(31, 'User Manager', '', 0, 0, '', 'Users', 'com_users', 0, '', 1, 'allowUserRegistration=1\nnew_usertype=Registered\nuseractivation=1\nfrontend_userparams=1\n\n', 1),
(32, 'Cache Manager', '', 0, 0, '', 'Cache', 'com_cache', 0, '', 1, '', 1),
(33, 'Control Panel', '', 0, 0, '', 'Control Panel', 'com_cpanel', 0, '', 1, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bak_contact_details`
--

CREATE TABLE IF NOT EXISTS `bak_contact_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `con_position` varchar(255) DEFAULT NULL,
  `address` text,
  `suburb` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `postcode` varchar(100) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `misc` mediumtext,
  `image` varchar(255) DEFAULT NULL,
  `imagepos` varchar(20) DEFAULT NULL,
  `email_to` varchar(255) DEFAULT NULL,
  `default_con` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `catid` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `mobile` varchar(255) NOT NULL DEFAULT '',
  `webpage` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `catid` (`catid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_contact_details`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_content`
--

CREATE TABLE IF NOT EXISTS `bak_content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `title_alias` varchar(255) NOT NULL DEFAULT '',
  `introtext` mediumtext NOT NULL,
  `fulltext` mediumtext NOT NULL,
  `state` tinyint(3) NOT NULL DEFAULT '0',
  `sectionid` int(11) unsigned NOT NULL DEFAULT '0',
  `mask` int(11) unsigned NOT NULL DEFAULT '0',
  `catid` int(11) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_by` int(11) unsigned NOT NULL DEFAULT '0',
  `created_by_alias` varchar(255) NOT NULL DEFAULT '',
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified_by` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_up` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_down` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `images` text NOT NULL,
  `urls` text NOT NULL,
  `attribs` text NOT NULL,
  `version` int(11) unsigned NOT NULL DEFAULT '1',
  `parentid` int(11) unsigned NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `metakey` text NOT NULL,
  `metadesc` text NOT NULL,
  `access` int(11) unsigned NOT NULL DEFAULT '0',
  `hits` int(11) unsigned NOT NULL DEFAULT '0',
  `metadata` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_section` (`sectionid`),
  KEY `idx_access` (`access`),
  KEY `idx_checkout` (`checked_out`),
  KEY `idx_state` (`state`),
  KEY `idx_catid` (`catid`),
  KEY `idx_createdby` (`created_by`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_content`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_content_frontpage`
--

CREATE TABLE IF NOT EXISTS `bak_content_frontpage` (
  `content_id` int(11) NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`content_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_content_frontpage`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_content_rating`
--

CREATE TABLE IF NOT EXISTS `bak_content_rating` (
  `content_id` int(11) NOT NULL DEFAULT '0',
  `rating_sum` int(11) unsigned NOT NULL DEFAULT '0',
  `rating_count` int(11) unsigned NOT NULL DEFAULT '0',
  `lastip` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`content_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_content_rating`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_core_acl_aro`
--

CREATE TABLE IF NOT EXISTS `bak_core_acl_aro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_value` varchar(240) NOT NULL DEFAULT '0',
  `value` varchar(240) NOT NULL DEFAULT '',
  `order_value` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `hidden` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `jos_section_value_value_aro` (`section_value`(100),`value`(100)),
  KEY `jos_gacl_hidden_aro` (`hidden`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_core_acl_aro`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_core_acl_aro_groups`
--

CREATE TABLE IF NOT EXISTS `bak_core_acl_aro_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `lft` int(11) NOT NULL DEFAULT '0',
  `rgt` int(11) NOT NULL DEFAULT '0',
  `value` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `jos_gacl_parent_id_aro_groups` (`parent_id`),
  KEY `jos_gacl_lft_rgt_aro_groups` (`lft`,`rgt`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `bak_core_acl_aro_groups`
--

INSERT INTO `bak_core_acl_aro_groups` (`id`, `parent_id`, `name`, `lft`, `rgt`, `value`) VALUES
(17, 0, 'ROOT', 1, 22, 'ROOT'),
(28, 17, 'USERS', 2, 21, 'USERS'),
(29, 28, 'Public Frontend', 3, 12, 'Public Frontend'),
(18, 29, 'Registered', 4, 11, 'Registered'),
(19, 18, 'Author', 5, 10, 'Author'),
(20, 19, 'Editor', 6, 9, 'Editor'),
(21, 20, 'Publisher', 7, 8, 'Publisher'),
(30, 28, 'Public Backend', 13, 20, 'Public Backend'),
(23, 30, 'Manager', 14, 19, 'Manager'),
(24, 23, 'Administrator', 15, 18, 'Administrator'),
(25, 24, 'Super Administrator', 16, 17, 'Super Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `bak_core_acl_aro_map`
--

CREATE TABLE IF NOT EXISTS `bak_core_acl_aro_map` (
  `acl_id` int(11) NOT NULL DEFAULT '0',
  `section_value` varchar(230) NOT NULL DEFAULT '0',
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`acl_id`,`section_value`,`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_core_acl_aro_map`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_core_acl_aro_sections`
--

CREATE TABLE IF NOT EXISTS `bak_core_acl_aro_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(230) NOT NULL DEFAULT '',
  `order_value` int(11) NOT NULL DEFAULT '0',
  `name` varchar(230) NOT NULL DEFAULT '',
  `hidden` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `jos_gacl_value_aro_sections` (`value`),
  KEY `jos_gacl_hidden_aro_sections` (`hidden`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `bak_core_acl_aro_sections`
--

INSERT INTO `bak_core_acl_aro_sections` (`id`, `value`, `order_value`, `name`, `hidden`) VALUES
(10, 'users', 1, 'Users', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bak_core_acl_groups_aro_map`
--

CREATE TABLE IF NOT EXISTS `bak_core_acl_groups_aro_map` (
  `group_id` int(11) NOT NULL DEFAULT '0',
  `section_value` varchar(240) NOT NULL DEFAULT '',
  `aro_id` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `group_id_aro_id_groups_aro_map` (`group_id`,`section_value`,`aro_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_core_acl_groups_aro_map`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_core_log_items`
--

CREATE TABLE IF NOT EXISTS `bak_core_log_items` (
  `time_stamp` date NOT NULL DEFAULT '0000-00-00',
  `item_table` varchar(50) NOT NULL DEFAULT '',
  `item_id` int(11) unsigned NOT NULL DEFAULT '0',
  `hits` int(11) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_core_log_items`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_core_log_searches`
--

CREATE TABLE IF NOT EXISTS `bak_core_log_searches` (
  `search_term` varchar(128) NOT NULL DEFAULT '',
  `hits` int(11) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_core_log_searches`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_groups`
--

CREATE TABLE IF NOT EXISTS `bak_groups` (
  `id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_groups`
--

INSERT INTO `bak_groups` (`id`, `name`) VALUES
(0, 'Public'),
(1, 'Registered'),
(2, 'Special');

-- --------------------------------------------------------

--
-- Table structure for table `bak_menu`
--

CREATE TABLE IF NOT EXISTS `bak_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menutype` varchar(75) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `alias` varchar(255) NOT NULL DEFAULT '',
  `link` text,
  `type` varchar(50) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `parent` int(11) unsigned NOT NULL DEFAULT '0',
  `componentid` int(11) unsigned NOT NULL DEFAULT '0',
  `sublevel` int(11) DEFAULT '0',
  `ordering` int(11) DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `pollid` int(11) NOT NULL DEFAULT '0',
  `browserNav` tinyint(4) DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `utaccess` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  `lft` int(11) unsigned NOT NULL DEFAULT '0',
  `rgt` int(11) unsigned NOT NULL DEFAULT '0',
  `home` int(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `componentid` (`componentid`,`menutype`,`published`,`access`),
  KEY `menutype` (`menutype`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `bak_menu`
--

INSERT INTO `bak_menu` (`id`, `menutype`, `name`, `alias`, `link`, `type`, `published`, `parent`, `componentid`, `sublevel`, `ordering`, `checked_out`, `checked_out_time`, `pollid`, `browserNav`, `access`, `utaccess`, `params`, `lft`, `rgt`, `home`) VALUES
(1, 'mainmenu', 'Home', 'home', 'index.php?option=com_content&view=frontpage', 'component', 1, 0, 20, 0, 1, 0, '0000-00-00 00:00:00', 0, 0, 0, 3, 'num_leading_articles=1\nnum_intro_articles=4\nnum_columns=2\nnum_links=4\norderby_pri=\norderby_sec=front\nshow_pagination=2\nshow_pagination_results=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bak_menu_types`
--

CREATE TABLE IF NOT EXISTS `bak_menu_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menutype` varchar(75) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `menutype` (`menutype`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `bak_menu_types`
--

INSERT INTO `bak_menu_types` (`id`, `menutype`, `title`, `description`) VALUES
(1, 'mainmenu', 'Main Menu', 'The main menu for the site');

-- --------------------------------------------------------

--
-- Table structure for table `bak_messages`
--

CREATE TABLE IF NOT EXISTS `bak_messages` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id_from` int(10) unsigned NOT NULL DEFAULT '0',
  `user_id_to` int(10) unsigned NOT NULL DEFAULT '0',
  `folder_id` int(10) unsigned NOT NULL DEFAULT '0',
  `date_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `state` int(11) NOT NULL DEFAULT '0',
  `priority` int(1) unsigned NOT NULL DEFAULT '0',
  `subject` text NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `useridto_state` (`user_id_to`,`state`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_messages`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_messages_cfg`
--

CREATE TABLE IF NOT EXISTS `bak_messages_cfg` (
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_name` varchar(100) NOT NULL DEFAULT '',
  `cfg_value` varchar(255) NOT NULL DEFAULT '',
  UNIQUE KEY `idx_user_var_name` (`user_id`,`cfg_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_messages_cfg`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_migration_backlinks`
--

CREATE TABLE IF NOT EXISTS `bak_migration_backlinks` (
  `itemid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` text NOT NULL,
  `sefurl` text NOT NULL,
  `newurl` text NOT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_migration_backlinks`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_modules`
--

CREATE TABLE IF NOT EXISTS `bak_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `ordering` int(11) NOT NULL DEFAULT '0',
  `position` varchar(50) DEFAULT NULL,
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `module` varchar(50) DEFAULT NULL,
  `numnews` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `showtitle` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `params` text NOT NULL,
  `iscore` tinyint(4) NOT NULL DEFAULT '0',
  `client_id` tinyint(4) NOT NULL DEFAULT '0',
  `control` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `published` (`published`,`access`),
  KEY `newsfeeds` (`module`,`published`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `bak_modules`
--

INSERT INTO `bak_modules` (`id`, `title`, `content`, `ordering`, `position`, `checked_out`, `checked_out_time`, `published`, `module`, `numnews`, `access`, `showtitle`, `params`, `iscore`, `client_id`, `control`) VALUES
(1, 'Main Menu', '', 1, 'left', 0, '0000-00-00 00:00:00', 1, 'mod_mainmenu', 0, 0, 1, 'menutype=mainmenu\nmoduleclass_sfx=_menu\n', 1, 0, ''),
(2, 'Login', '', 1, 'login', 0, '0000-00-00 00:00:00', 1, 'mod_login', 0, 0, 1, '', 1, 1, ''),
(3, 'Popular', '', 3, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_popular', 0, 2, 1, '', 0, 1, ''),
(4, 'Recent added Articles', '', 4, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_latest', 0, 2, 1, 'ordering=c_dsc\nuser_id=0\ncache=0\n\n', 0, 1, ''),
(5, 'Menu Stats', '', 5, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_stats', 0, 2, 1, '', 0, 1, ''),
(6, 'Unread Messages', '', 1, 'header', 0, '0000-00-00 00:00:00', 1, 'mod_unread', 0, 2, 1, '', 1, 1, ''),
(7, 'Online Users', '', 2, 'header', 0, '0000-00-00 00:00:00', 1, 'mod_online', 0, 2, 1, '', 1, 1, ''),
(8, 'Toolbar', '', 1, 'toolbar', 0, '0000-00-00 00:00:00', 1, 'mod_toolbar', 0, 2, 1, '', 1, 1, ''),
(9, 'Quick Icons', '', 1, 'icon', 0, '0000-00-00 00:00:00', 1, 'mod_quickicon', 0, 2, 1, '', 1, 1, ''),
(10, 'Logged in Users', '', 2, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_logged', 0, 2, 1, '', 0, 1, ''),
(11, 'Footer', '', 0, 'footer', 0, '0000-00-00 00:00:00', 1, 'mod_footer', 0, 0, 1, '', 1, 1, ''),
(12, 'Admin Menu', '', 1, 'menu', 0, '0000-00-00 00:00:00', 1, 'mod_menu', 0, 2, 1, '', 0, 1, ''),
(13, 'Admin SubMenu', '', 1, 'submenu', 0, '0000-00-00 00:00:00', 1, 'mod_submenu', 0, 2, 1, '', 0, 1, ''),
(14, 'User Status', '', 1, 'status', 0, '0000-00-00 00:00:00', 1, 'mod_status', 0, 2, 1, '', 0, 1, ''),
(15, 'Title', '', 1, 'title', 0, '0000-00-00 00:00:00', 1, 'mod_title', 0, 2, 1, '', 0, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `bak_modules_menu`
--

CREATE TABLE IF NOT EXISTS `bak_modules_menu` (
  `moduleid` int(11) NOT NULL DEFAULT '0',
  `menuid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`moduleid`,`menuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_modules_menu`
--

INSERT INTO `bak_modules_menu` (`moduleid`, `menuid`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bak_newsfeeds`
--

CREATE TABLE IF NOT EXISTS `bak_newsfeeds` (
  `catid` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `alias` varchar(255) NOT NULL DEFAULT '',
  `link` text NOT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `numarticles` int(11) unsigned NOT NULL DEFAULT '1',
  `cache_time` int(11) unsigned NOT NULL DEFAULT '3600',
  `checked_out` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `rtl` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `published` (`published`),
  KEY `catid` (`catid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_newsfeeds`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_plugins`
--

CREATE TABLE IF NOT EXISTS `bak_plugins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `element` varchar(100) NOT NULL DEFAULT '',
  `folder` varchar(100) NOT NULL DEFAULT '',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `published` tinyint(3) NOT NULL DEFAULT '0',
  `iscore` tinyint(3) NOT NULL DEFAULT '0',
  `client_id` tinyint(3) NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_folder` (`published`,`client_id`,`access`,`folder`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `bak_plugins`
--

INSERT INTO `bak_plugins` (`id`, `name`, `element`, `folder`, `access`, `ordering`, `published`, `iscore`, `client_id`, `checked_out`, `checked_out_time`, `params`) VALUES
(1, 'Authentication - Joomla', 'joomla', 'authentication', 0, 1, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(2, 'Authentication - LDAP', 'ldap', 'authentication', 0, 2, 0, 1, 0, 0, '0000-00-00 00:00:00', 'host=\nport=389\nuse_ldapV3=0\nnegotiate_tls=0\nno_referrals=0\nauth_method=bind\nbase_dn=\nsearch_string=\nusers_dn=\nusername=\npassword=\nldap_fullname=fullName\nldap_email=mail\nldap_uid=uid\n\n'),
(3, 'Authentication - GMail', 'gmail', 'authentication', 0, 4, 0, 0, 0, 0, '0000-00-00 00:00:00', ''),
(4, 'Authentication - OpenID', 'openid', 'authentication', 0, 3, 0, 0, 0, 0, '0000-00-00 00:00:00', ''),
(5, 'User - Joomla!', 'joomla', 'user', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', 'autoregister=1\n\n'),
(6, 'Search - Content', 'content', 'search', 0, 1, 1, 1, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\nsearch_content=1\nsearch_uncategorised=1\nsearch_archived=1\n\n'),
(7, 'Search - Contacts', 'contacts', 'search', 0, 3, 1, 1, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(8, 'Search - Categories', 'categories', 'search', 0, 4, 1, 0, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(9, 'Search - Sections', 'sections', 'search', 0, 5, 1, 0, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(10, 'Search - Newsfeeds', 'newsfeeds', 'search', 0, 6, 1, 0, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(11, 'Search - Weblinks', 'weblinks', 'search', 0, 2, 1, 1, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(12, 'Content - Pagebreak', 'pagebreak', 'content', 0, 10000, 1, 1, 0, 0, '0000-00-00 00:00:00', 'enabled=1\ntitle=1\nmultipage_toc=1\nshowall=1\n\n'),
(13, 'Content - Rating', 'vote', 'content', 0, 4, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(14, 'Content - Email Cloaking', 'emailcloak', 'content', 0, 5, 1, 0, 0, 0, '0000-00-00 00:00:00', 'mode=1\n\n'),
(15, 'Content - Code Hightlighter (GeSHi)', 'geshi', 'content', 0, 5, 0, 0, 0, 0, '0000-00-00 00:00:00', ''),
(16, 'Content - Load Module', 'loadmodule', 'content', 0, 6, 1, 0, 0, 0, '0000-00-00 00:00:00', 'enabled=1\nstyle=0\n\n'),
(17, 'Content - Page Navigation', 'pagenavigation', 'content', 0, 2, 1, 1, 0, 0, '0000-00-00 00:00:00', 'position=1\n\n'),
(18, 'Editor - No Editor', 'none', 'editors', 0, 0, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(19, 'Editor - TinyMCE', 'tinymce', 'editors', 0, 0, 1, 1, 0, 0, '0000-00-00 00:00:00', 'mode=advanced\nskin=0\ncompressed=0\ncleanup_startup=0\ncleanup_save=2\nentity_encoding=raw\nlang_mode=0\nlang_code=en\ntext_direction=ltr\ncontent_css=1\ncontent_css_custom=\nrelative_urls=1\nnewlines=0\ninvalid_elements=applet\nextended_elements=\ntoolbar=top\ntoolbar_align=left\nhtml_height=550\nhtml_width=750\nelement_path=1\nfonts=1\npaste=1\nsearchreplace=1\ninsertdate=1\nformat_date=%Y-%m-%d\ninserttime=1\nformat_time=%H:%M:%S\ncolors=1\ntable=1\nsmilies=1\nmedia=1\nhr=1\ndirectionality=1\nfullscreen=1\nstyle=1\nlayer=1\nxhtmlxtras=1\nvisualchars=1\nnonbreaking=1\ntemplate=0\nadvimage=1\nadvlink=1\nautosave=1\ncontextmenu=1\ninlinepopups=1\nsafari=1\ncustom_plugin=\ncustom_button=\n\n'),
(20, 'Editor - XStandard Lite 2.0', 'xstandard', 'editors', 0, 0, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(21, 'Editor Button - Image', 'image', 'editors-xtd', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(22, 'Editor Button - Pagebreak', 'pagebreak', 'editors-xtd', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(23, 'Editor Button - Readmore', 'readmore', 'editors-xtd', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(24, 'XML-RPC - Joomla', 'joomla', 'xmlrpc', 0, 7, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(25, 'XML-RPC - Blogger API', 'blogger', 'xmlrpc', 0, 7, 0, 1, 0, 0, '0000-00-00 00:00:00', 'catid=1\nsectionid=0\n\n'),
(27, 'System - SEF', 'sef', 'system', 0, 1, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(28, 'System - Debug', 'debug', 'system', 0, 2, 1, 0, 0, 0, '0000-00-00 00:00:00', 'queries=1\nmemory=1\nlangauge=1\n\n'),
(29, 'System - Legacy', 'legacy', 'system', 0, 3, 0, 1, 0, 0, '0000-00-00 00:00:00', 'route=0\n\n'),
(30, 'System - Cache', 'cache', 'system', 0, 4, 0, 1, 0, 0, '0000-00-00 00:00:00', 'browsercache=0\ncachetime=15\n\n'),
(31, 'System - Log', 'log', 'system', 0, 5, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(32, 'System - Remember Me', 'remember', 'system', 0, 6, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(33, 'System - Backlink', 'backlink', 'system', 0, 7, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(34, 'System - Mootools Upgrade', 'mtupgrade', 'system', 0, 8, 0, 1, 0, 0, '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `bak_polls`
--

CREATE TABLE IF NOT EXISTS `bak_polls` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `voters` int(9) NOT NULL DEFAULT '0',
  `checked_out` int(11) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `access` int(11) NOT NULL DEFAULT '0',
  `lag` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_polls`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_poll_data`
--

CREATE TABLE IF NOT EXISTS `bak_poll_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pollid` int(11) NOT NULL DEFAULT '0',
  `text` text NOT NULL,
  `hits` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pollid` (`pollid`,`text`(1))
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_poll_data`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_poll_date`
--

CREATE TABLE IF NOT EXISTS `bak_poll_date` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `vote_id` int(11) NOT NULL DEFAULT '0',
  `poll_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `poll_id` (`poll_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_poll_date`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_poll_menu`
--

CREATE TABLE IF NOT EXISTS `bak_poll_menu` (
  `pollid` int(11) NOT NULL DEFAULT '0',
  `menuid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pollid`,`menuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_poll_menu`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_sections`
--

CREATE TABLE IF NOT EXISTS `bak_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `image` text NOT NULL,
  `scope` varchar(50) NOT NULL DEFAULT '',
  `image_position` varchar(30) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_scope` (`scope`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_sections`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_session`
--

CREATE TABLE IF NOT EXISTS `bak_session` (
  `username` varchar(150) DEFAULT '',
  `time` varchar(14) DEFAULT '',
  `session_id` varchar(200) NOT NULL DEFAULT '0',
  `guest` tinyint(4) DEFAULT '1',
  `userid` int(11) DEFAULT '0',
  `usertype` varchar(50) DEFAULT '',
  `gid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `client_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `data` longtext,
  PRIMARY KEY (`session_id`(64)),
  KEY `whosonline` (`guest`,`usertype`),
  KEY `userid` (`userid`),
  KEY `time` (`time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_session`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_stats_agents`
--

CREATE TABLE IF NOT EXISTS `bak_stats_agents` (
  `agent` varchar(255) NOT NULL DEFAULT '',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `hits` int(11) unsigned NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_stats_agents`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_templates_menu`
--

CREATE TABLE IF NOT EXISTS `bak_templates_menu` (
  `template` varchar(255) NOT NULL DEFAULT '',
  `menuid` int(11) NOT NULL DEFAULT '0',
  `client_id` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`menuid`,`client_id`,`template`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bak_templates_menu`
--

INSERT INTO `bak_templates_menu` (`template`, `menuid`, `client_id`) VALUES
('rhuk_milkyway', 0, 0),
('khepri', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bak_users`
--

CREATE TABLE IF NOT EXISTS `bak_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(150) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `usertype` varchar(25) NOT NULL DEFAULT '',
  `block` tinyint(4) NOT NULL DEFAULT '0',
  `sendEmail` tinyint(4) DEFAULT '0',
  `gid` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `registerDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastvisitDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `activation` varchar(100) NOT NULL DEFAULT '',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usertype` (`usertype`),
  KEY `idx_name` (`name`),
  KEY `gid_block` (`gid`,`block`),
  KEY `username` (`username`),
  KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_users`
--


-- --------------------------------------------------------

--
-- Table structure for table `bak_weblinks`
--

CREATE TABLE IF NOT EXISTS `bak_weblinks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `catid` int(11) NOT NULL DEFAULT '0',
  `sid` int(11) NOT NULL DEFAULT '0',
  `title` varchar(250) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `url` varchar(250) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `hits` int(11) NOT NULL DEFAULT '0',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `approved` tinyint(1) NOT NULL DEFAULT '1',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `catid` (`catid`,`published`,`archived`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `bak_weblinks`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_banner`
--

CREATE TABLE IF NOT EXISTS `jos_banner` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL DEFAULT '0',
  `type` varchar(30) NOT NULL DEFAULT 'banner',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `imptotal` int(11) NOT NULL DEFAULT '0',
  `impmade` int(11) NOT NULL DEFAULT '0',
  `clicks` int(11) NOT NULL DEFAULT '0',
  `imageurl` varchar(100) NOT NULL DEFAULT '',
  `clickurl` varchar(200) NOT NULL DEFAULT '',
  `date` datetime DEFAULT NULL,
  `showBanner` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `editor` varchar(50) DEFAULT NULL,
  `custombannercode` text,
  `catid` int(10) unsigned NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `sticky` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `publish_up` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_down` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tags` text NOT NULL,
  `params` text NOT NULL,
  PRIMARY KEY (`bid`),
  KEY `viewbanner` (`showBanner`),
  KEY `idx_banner_catid` (`catid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_banner`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_bannerclient`
--

CREATE TABLE IF NOT EXISTS `jos_bannerclient` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `contact` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `extrainfo` text NOT NULL,
  `checked_out` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out_time` time DEFAULT NULL,
  `editor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_bannerclient`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_bannertrack`
--

CREATE TABLE IF NOT EXISTS `jos_bannertrack` (
  `track_date` date NOT NULL,
  `track_type` int(10) unsigned NOT NULL,
  `banner_id` int(10) unsigned NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_bannertrack`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_categories`
--

CREATE TABLE IF NOT EXISTS `jos_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT '',
  `section` varchar(50) NOT NULL DEFAULT '',
  `image_position` varchar(30) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `editor` varchar(50) DEFAULT NULL,
  `ordering` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cat_idx` (`section`,`published`,`access`),
  KEY `idx_access` (`access`),
  KEY `idx_checkout` (`checked_out`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `jos_categories`
--

INSERT INTO `jos_categories` (`id`, `parent_id`, `title`, `name`, `alias`, `image`, `section`, `image_position`, `description`, `published`, `checked_out`, `checked_out_time`, `editor`, `ordering`, `access`, `count`, `params`) VALUES
(1, 0, 'Company', '', 'company', '', '3', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 1, 0, 0, ''),
(2, 0, 'Services', '', 'services', '', '1', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 1, 0, 0, ''),
(3, 0, 'Blog', '', 'blog', '', '1', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 2, 0, 0, ''),
(4, 0, 'Careers', '', 'careers', '', '3', 'left', '<p>INTERSOG believes that our success is directly related to the quality of our employees. We are always looking for bright and talented individuals to join our team, particularly those interested in working in a fast-paced, high-growth, high-technology environment. Our corporate culture attracts motivated individuals who thrive in a collaborative setting, where hard work and having fun are always in balance.</p>\r\n<h1>We offer our employees:</h1>\r\n<ul>\r\n<li> - Challenging and Engaging Projects</li>\r\n<li> - Career and Skill Development  Opportunities</li>\r\n<li> - A Casual Work Environment</li>\r\n<li> - Training Opportunities</li>\r\n<li> - Competitive Compensation and Bonus Opportunities.</li>\r\n<li> - Your specialized skills, motivation and desire to grow as an IT professional will ensure your success with INTERSOG.</li>\r\n</ul>\r\n<p>Please familiarize yourself with our current career opportunities. If no current openings fit your skill set, please feel free to forward your resume to: <a href="mailto:jobs@intersog.com">jobs@intersog.com</a>. Your information will be added to our database and you will contact you should a suitable position become available. Thank you for your interest in INTERSOG.</p>', 1, 0, '0000-00-00 00:00:00', NULL, 3, 0, 0, ''),
(5, 0, 'Home', '', 'home', '', '1', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 4, 0, 0, ''),
(6, 0, 'Portfolio', '', 'portfolio', '', '8', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 5, 0, 0, ''),
(7, 0, 'The Process', '', 'the-process', '', '8', 'left', '<h1>Methodology</h1>\r\n<p>\r\nWe are Intersog - an international company with an extensive expertise of mobile application development targeted towards a wide range of existing platforms and markets. That said, we currently focus a majority of our development efforts on applications for iOS devices as this is the most innovative and profitable platform in the mobile arena today. We also create projects for Android platforms, which are based on a framework developed by Google and the Open Handset Alliance, and is now the most promising and rapidly growing mobile OS. Furthermore, we provide development services for Windows and Blackberry platforms as well since we aim to provide mobile application solutions suited for use within the business world, an environment where these two platforms already hold established positions. </p>\r\n<p>\r\nOur team of talented, skilled, and effective developers aspires to provide our customers with unique and customized applications which, above all else, meet their requirements and expectations. Intersog entered the mobile development industry in early 2008 and quickly asserted itself as a leading application developer in this highly competitive environment. Our software creation process is handled with help from various efficient Agile methodologies including XP and Scrum. Though the development process of individual applications varies depending on the teams assigned to it, specific customer expectations, as well as unique project needs, we use the scrum process described in our development section for the majority of all projects we take on.  </p>\r\n		\r\n<h1>Analysis</h1>\r\n\r\n<p>We believe that every stage of our projects are equally important to execute effectively to ensure positive outcomes, and we take a lot of effort to execute each step of development correctly. However, it’s very difficult to manage projects without proper documentation and that’s why the analysis stage, which includes user experience insurance, application prototyping, and  documentation creation, remains one of the most important stages for correctly starting most projects. In the beginning we bring together interactive mock-ups, prototypes whose main goal is to form the design and navigation bases, and to make your application feel and look great at completion. Our analysis and QA teams will work with our clients to figure out their target user’s needs and preferences, and create the most valuable outcome accordingly. As a client, you can expect the creation of user stories or ‘use-cases’, as well as prototyping and wire frame development at this stage. This won’t be a polished graphic user interface quite yet,  but only draft to get first impressions and to help our clients to start forming more informed opinions about their project. This stage is very important for the project’s future in general, and its a stage that’s never underestimated at Intersog.</p>\r\n\r\n<h1>Development</h1>\r\n<p>\r\nAfter the final planning and documentation aspects of your project are complete, we begin coding. We utilize Scrum and Agile practices so that the development process is divided into separate periods with shorter time-frames called sprints. Each sprint usually takes around two weeks of pure development, with an analysis stage that starts at the end of each iteration. During this stage our analysis and QA teams create all the necessary artifacts and documentation, such as user stories and test-cases. The integration phase is often only begun at the very end of a sprint cycle and may last up to one week.</p>\r\n\r\n<h2>Each sprint will contain the following phases:</h2>\r\n<ul>\r\n<li>1. Features selection and discussion with the client. Rough estimates of work content and expected velocity are done.</li>\r\n<li>2. At the first day of the sprint we arrange a Sprint Planning Meeting to detect tasks that will be included in the iteration where we create sub-tasks and plan out the tickets for our project management system called Redmine.</li>\r\n<li>3. First week of the sprint will generally be devoted to the implementation of new features while our QA and analysis teams are preparing the necessary documentation for the next sprint and testing sessions.</li>\r\n<li>4. The second week will be dedicated to testing and debugging, and our QA engineers, analysts, and developers will tightly cooperate with one another to maintain a stable and operational build of the application.</li>\r\n<li>5. At the end of the iteration a Sprint Review/Retrospective meeting will take place where our team as well as our clients discuss their results and additional quality assurance criteria are figured in as well.</li>\r\n</ul>\r\n<p>Our Agile approach and scrum-based methodology are outstanding tools which help us to deploy working application prototypes soon as possible, always emphasizing client feedback, high development quality, as well as cost-effectiveness.  </p>\r\n\r\n\r\n<h1>Testing</h1>\r\n<p>\r\nAfter the analysis stage we have user stories or use-cases fully ready and polished. \r\nThese entities will be either similar or dissimilar depending on if we’re gearing development for several platforms or applications or not. Using this documentation as a basis, our specialists create a Test Plan which outlines the responsibilities of the QA team, and arrangements with managers and the development team. Further into the development of this document smoke tests are created as well. Smoke tests include several test cases which when taken together cover the full breadth of  the tested system’s general functionality. Smoke tests, test cases, and additional entities will incorporate all requirements and basic specifications fully.</p>\r\n\r\n<h1>Publishing</h1>\r\n<p>\r\nUtilizing our experience in application development as well as the promotion of our own product catalog, the Intersog team would be glad to provide not only the aforementioned services but also publishing and marketing services with the help of our strategic partner - the ComboApp Marketing & PR Agency.\r\n</p><p>\r\nBeing part of the iPhone Developer Program, we at Intersog have immediate access to our App Store account and this means that you don’t need to apply for membership when releasing content to the App Store if you don’t want to. We''ll take care of it by ourselves and will make sure deployment is completed smoothly and the content is promptly released to countless iPhone users from around the world. However, we realize that a lot our our customers might desire to become members of the iPhone Developer Program themselves, in which case we''ll gladly help in opening this account and submitting an application as well.</p>\r\n<p>\r\nBesides the iOS marketplace we also utilize market distribution software for Android platforms including their official Google market, and would be happy to grant your application access to this market via our software as well. The good news is that you won’t need to wait very long for application approval and publishing moderation. In a matter of days your application will be ready for sale.</p>\r\n<p>\r\nOf course, we are also able to help our clients submit their applications to the RIM and W7 marketplaces as well, as we’ve had a number of projects developed for these platforms as well.</p>\r\n\r\n<h1>Support</h1>\r\n<p>\r\nMobile operating systems such as Android OS, iOs, Blackberry OS and W7  have an established reputation at the high end of the smart phone arena. These platforms are developing much faster than that of the desktop market, and the total volume of applications created for these platforms is simply stunning. Because of this fact though, it’s very important to maintain your application properly and provide quality support services, resolve all possible application problems, and improve their functionality so that your application has the best chances of being noticed by consumers. At Intersog we’re happy to offer our help in offering our client’s application support services, and usually include proposal for such services following development completion.</p>', 1, 0, '0000-00-00 00:00:00', NULL, 1, 0, 0, ''),
(8, 0, 'Order Now!', '', 'order-now', '', '8', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 6, 0, 0, ''),
(9, 0, 'Leadership', '', 'leadership', '', '3', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 5, 0, 0, ''),
(10, 0, 'In The News', '', 'in-the-news', '', '3', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 6, 0, 0, ''),
(11, 0, 'About Us', '', 'about-us', '', '3', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 7, 0, 0, ''),
(12, 0, 'Project(Idea) Consulting', '', 'projectidea-consulting', '', '4', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 1, 0, 0, ''),
(13, 0, 'Technical Specification ', '', 'technical-specification-', '', '4', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 2, 0, 0, ''),
(14, 0, 'Design', '', 'design', '', '4', 'left', '', 1, 62, '2011-04-13 16:48:53', NULL, 3, 0, 0, ''),
(21, 0, 'Contacts', '', 'contacts', '', '6', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 1, 0, 0, ''),
(16, 0, 'Mobile Application Development', '', 'mobile-application-development', '', '4', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 5, 0, 0, ''),
(17, 0, 'Game Development', '', 'game-development', '', '4', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 5, 0, 0, ''),
(18, 0, 'Testing & QA', '', 'testing-a-qa', '', '4', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 6, 0, 0, ''),
(19, 0, 'Release management(Publishing)', '', 'release-managementpublishing', '', '4', 'left', '<p>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div><span style="mso-hansi-font-family: Arial; font-size: 24pt;" lang="EN-US"><strong>Publishing applications</strong></span><span style="mso-hansi-font-family: Arial; font-size: 24pt;" lang="EN-US"> </span></div>\r\n<div></div>\r\n<div><span style="mso-hansi-font-family: Arial; font-size: 24pt;" lang="EN-US">\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div><span style="mso-hansi-font-family: Arial; font-size: 14pt;" lang="EN-US"><strong>Android, Blackberry, web-development </strong></span></div>\r\n<div><span style="mso-hansi-font-family: Arial; font-size: 14pt;" lang="EN-US"><strong> </strong></span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-US">Intersog is</span><span style="font-size: 14pt;"> porting </span><span style="font-size: 14pt;" lang="EN-US">for </span><span style="font-size: 14pt;">Android </span><span style="font-size: 14pt;" lang="EN-US">and Blackberry </span><span style="font-size: 14pt;">RMSDK</span><span style="font-size: 14pt;" lang="EN-US"> </span><span style="font-size: 14pt;">product including PDF reader, EPUB reader and ability </span><span style="font-size: 14pt;">to work with Adobe DRM protected files. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;"><br /></span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><img src="images/stories/nes/Publishing.png" border="0" /></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-GB"><br /></span></div>\r\n</div>\r\n</span></div>\r\n</div>\r\n</p>', 1, 62, '2011-04-18 15:32:01', NULL, 7, 0, 0, ''),
(20, 0, 'Support', '', 'support', '', '4', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 8, 0, 0, ''),
(22, 0, 'Contacts', '', 'contacts', '', 'com_contact_details', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 1, 0, 0, ''),
(23, 0, 'News', '', 'news', '', '9', 'left', '', 1, 0, '0000-00-00 00:00:00', NULL, 1, 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `jos_components`
--

CREATE TABLE IF NOT EXISTS `jos_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `link` varchar(255) NOT NULL DEFAULT '',
  `menuid` int(11) unsigned NOT NULL DEFAULT '0',
  `parent` int(11) unsigned NOT NULL DEFAULT '0',
  `admin_menu_link` varchar(255) NOT NULL DEFAULT '',
  `admin_menu_alt` varchar(255) NOT NULL DEFAULT '',
  `option` varchar(50) NOT NULL DEFAULT '',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `admin_menu_img` varchar(255) NOT NULL DEFAULT '',
  `iscore` tinyint(4) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `parent_option` (`parent`,`option`(32))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `jos_components`
--

INSERT INTO `jos_components` (`id`, `name`, `link`, `menuid`, `parent`, `admin_menu_link`, `admin_menu_alt`, `option`, `ordering`, `admin_menu_img`, `iscore`, `params`, `enabled`) VALUES
(1, 'Banners', '', 0, 0, '', 'Banner Management', 'com_banners', 0, 'js/ThemeOffice/component.png', 0, 'track_impressions=0\ntrack_clicks=0\ntag_prefix=\n\n', 1),
(2, 'Banners', '', 0, 1, 'option=com_banners', 'Active Banners', 'com_banners', 1, 'js/ThemeOffice/edit.png', 0, '', 1),
(3, 'Clients', '', 0, 1, 'option=com_banners&c=client', 'Manage Clients', 'com_banners', 2, 'js/ThemeOffice/categories.png', 0, '', 1),
(4, 'Web Links', 'option=com_weblinks', 0, 0, '', 'Manage Weblinks', 'com_weblinks', 0, 'js/ThemeOffice/component.png', 0, 'show_comp_description=1\ncomp_description=\nshow_link_hits=1\nshow_link_description=1\nshow_other_cats=1\nshow_headings=1\nshow_page_title=1\nlink_target=0\nlink_icons=\n\n', 1),
(5, 'Links', '', 0, 4, 'option=com_weblinks', 'View existing weblinks', 'com_weblinks', 1, 'js/ThemeOffice/edit.png', 0, '', 1),
(6, 'Categories', '', 0, 4, 'option=com_categories&section=com_weblinks', 'Manage weblink categories', '', 2, 'js/ThemeOffice/categories.png', 0, '', 1),
(7, 'Contacts', 'option=com_contact', 0, 0, '', 'Edit contact details', 'com_contact', 0, 'js/ThemeOffice/component.png', 1, 'contact_icons=0\nicon_address=\nicon_email=\nicon_telephone=\nicon_fax=\nicon_misc=\nshow_headings=1\nshow_position=1\nshow_email=0\nshow_telephone=1\nshow_mobile=1\nshow_fax=1\nbannedEmail=\nbannedSubject=\nbannedText=\nsession=1\ncustomReply=0\n\n', 1),
(8, 'Contacts', '', 0, 7, 'option=com_contact', 'Edit contact details', 'com_contact', 0, 'js/ThemeOffice/edit.png', 1, '', 1),
(9, 'Categories', '', 0, 7, 'option=com_categories&section=com_contact_details', 'Manage contact categories', '', 2, 'js/ThemeOffice/categories.png', 1, 'contact_icons=0\nicon_address=\nicon_email=\nicon_telephone=\nicon_fax=\nicon_misc=\nshow_headings=1\nshow_position=1\nshow_email=0\nshow_telephone=1\nshow_mobile=1\nshow_fax=1\nbannedEmail=\nbannedSubject=\nbannedText=\nsession=1\ncustomReply=0\n\n', 1),
(10, 'Polls', 'option=com_poll', 0, 0, 'option=com_poll', 'Manage Polls', 'com_poll', 0, 'js/ThemeOffice/component.png', 0, '', 1),
(11, 'News Feeds', 'option=com_newsfeeds', 0, 0, '', 'News Feeds Management', 'com_newsfeeds', 0, 'js/ThemeOffice/component.png', 0, '', 1),
(12, 'Feeds', '', 0, 11, 'option=com_newsfeeds', 'Manage News Feeds', 'com_newsfeeds', 1, 'js/ThemeOffice/edit.png', 0, 'show_headings=1\nshow_name=1\nshow_articles=1\nshow_link=1\nshow_cat_description=1\nshow_cat_items=1\nshow_feed_image=1\nshow_feed_description=1\nshow_item_description=1\nfeed_word_count=0\n\n', 1),
(13, 'Categories', '', 0, 11, 'option=com_categories&section=com_newsfeeds', 'Manage Categories', '', 2, 'js/ThemeOffice/categories.png', 0, '', 1),
(14, 'User', 'option=com_user', 0, 0, '', '', 'com_user', 0, '', 1, '', 1),
(15, 'Search', 'option=com_search', 0, 0, 'option=com_search', 'Search Statistics', 'com_search', 0, 'js/ThemeOffice/component.png', 1, 'enabled=0\n\n', 1),
(16, 'Categories', '', 0, 1, 'option=com_categories&section=com_banner', 'Categories', '', 3, '', 1, '', 1),
(17, 'Wrapper', 'option=com_wrapper', 0, 0, '', 'Wrapper', 'com_wrapper', 0, '', 1, '', 1),
(18, 'Mail To', '', 0, 0, '', '', 'com_mailto', 0, '', 1, '', 1),
(19, 'Media Manager', '', 0, 0, 'option=com_media', 'Media Manager', 'com_media', 0, '', 1, 'upload_extensions=bmp,csv,doc,epg,gif,ico,jpg,odg,odp,ods,odt,pdf,png,ppt,swf,txt,xcf,xls,BMP,CSV,DOC,EPG,GIF,ICO,JPG,ODG,ODP,ODS,ODT,PDF,PNG,PPT,SWF,TXT,XCF,XLS\nupload_maxsize=10000000\nfile_path=images\nimage_path=images/stories\nrestrict_uploads=1\nallowed_media_usergroup=3\ncheck_mime=1\nimage_extensions=bmp,gif,jpg,png\nignore_extensions=\nupload_mime=image/jpeg,image/gif,image/png,image/bmp,application/x-shockwave-flash,application/msword,application/excel,application/pdf,application/powerpoint,text/plain,application/x-zip\nupload_mime_illegal=text/html\nenable_flash=0\n\n', 1),
(20, 'Articles', 'option=com_content', 0, 0, '', '', 'com_content', 0, '', 1, 'show_noauth=0\nshow_title=1\nlink_titles=1\nshow_intro=0\nshow_section=0\nlink_section=0\nshow_category=0\nlink_category=0\nshow_author=0\nshow_create_date=0\nshow_modify_date=0\nshow_item_navigation=0\nshow_readmore=1\nshow_vote=0\nshow_icons=0\nshow_pdf_icon=0\nshow_print_icon=0\nshow_email_icon=0\nshow_hits=0\nfeed_summary=0\nfilter_tags=\nfilter_attritbutes=\n\n', 1),
(21, 'Configuration Manager', '', 0, 0, '', 'Configuration', 'com_config', 0, '', 1, '', 1),
(22, 'Installation Manager', '', 0, 0, '', 'Installer', 'com_installer', 0, '', 1, '', 1),
(23, 'Language Manager', '', 0, 0, '', 'Languages', 'com_languages', 0, '', 1, '', 1),
(24, 'Mass mail', '', 0, 0, '', 'Mass Mail', 'com_massmail', 0, '', 1, 'mailSubjectPrefix=\nmailBodySuffix=\n\n', 1),
(25, 'Menu Editor', '', 0, 0, '', 'Menu Editor', 'com_menus', 0, '', 1, '', 1),
(27, 'Messaging', '', 0, 0, '', 'Messages', 'com_messages', 0, '', 1, '', 1),
(28, 'Modules Manager', '', 0, 0, '', 'Modules', 'com_modules', 0, '', 1, '', 1),
(29, 'Plugin Manager', '', 0, 0, '', 'Plugins', 'com_plugins', 0, '', 1, '', 1),
(30, 'Template Manager', '', 0, 0, '', 'Templates', 'com_templates', 0, '', 1, '', 1),
(31, 'User Manager', '', 0, 0, '', 'Users', 'com_users', 0, '', 1, 'allowUserRegistration=1\nnew_usertype=Registered\nuseractivation=1\nfrontend_userparams=1\n\n', 1),
(32, 'Cache Manager', '', 0, 0, '', 'Cache', 'com_cache', 0, '', 1, '', 1),
(33, 'Control Panel', '', 0, 0, '', 'Control Panel', 'com_cpanel', 0, '', 1, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `jos_contact_details`
--

CREATE TABLE IF NOT EXISTS `jos_contact_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `con_position` varchar(255) DEFAULT NULL,
  `address` text,
  `suburb` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `postcode` varchar(100) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `misc` mediumtext,
  `image` varchar(255) DEFAULT NULL,
  `imagepos` varchar(20) DEFAULT NULL,
  `email_to` varchar(255) DEFAULT NULL,
  `default_con` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `catid` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `mobile` varchar(255) NOT NULL DEFAULT '',
  `webpage` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `catid` (`catid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `jos_contact_details`
--

INSERT INTO `jos_contact_details` (`id`, `name`, `alias`, `con_position`, `address`, `suburb`, `state`, `country`, `postcode`, `telephone`, `fax`, `misc`, `image`, `imagepos`, `email_to`, `default_con`, `published`, `checked_out`, `checked_out_time`, `ordering`, `params`, `user_id`, `catid`, `access`, `mobile`, `webpage`) VALUES
(1, 'INTERSOG', 'contacts', '', '125 S EFFERSON ST STE 2010', 'CHICAGO', 'IL', 'USA', '60661', '7733050885', '', '', '', NULL, 'contact@intersog.com', 0, 1, 0, '0000-00-00 00:00:00', 1, 'show_name=1\nshow_position=0\nshow_email=1\nshow_street_address=1\nshow_suburb=1\nshow_state=1\nshow_postcode=1\nshow_country=1\nshow_telephone=1\nshow_mobile=0\nshow_fax=0\nshow_webpage=0\nshow_misc=0\nshow_image=0\nallow_vcard=0\ncontact_icons=0\nicon_address=\nicon_email=\nicon_telephone=\nicon_mobile=\nicon_fax=\nicon_misc=\nshow_email_form=1\nemail_description=contact@intersog.com\nshow_email_copy=1\nbanned_email=\nbanned_subject=\nbanned_text=', 0, 22, 0, '7733050885', '');

-- --------------------------------------------------------

--
-- Table structure for table `jos_content`
--

CREATE TABLE IF NOT EXISTS `jos_content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `title_alias` varchar(255) NOT NULL DEFAULT '',
  `introtext` mediumtext NOT NULL,
  `fulltext` mediumtext NOT NULL,
  `state` tinyint(3) NOT NULL DEFAULT '0',
  `sectionid` int(11) unsigned NOT NULL DEFAULT '0',
  `mask` int(11) unsigned NOT NULL DEFAULT '0',
  `catid` int(11) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_by` int(11) unsigned NOT NULL DEFAULT '0',
  `created_by_alias` varchar(255) NOT NULL DEFAULT '',
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified_by` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_up` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_down` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `images` text NOT NULL,
  `urls` text NOT NULL,
  `attribs` text NOT NULL,
  `version` int(11) unsigned NOT NULL DEFAULT '1',
  `parentid` int(11) unsigned NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `metakey` text NOT NULL,
  `metadesc` text NOT NULL,
  `access` int(11) unsigned NOT NULL DEFAULT '0',
  `hits` int(11) unsigned NOT NULL DEFAULT '0',
  `metadata` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_section` (`sectionid`),
  KEY `idx_access` (`access`),
  KEY `idx_checkout` (`checked_out`),
  KEY `idx_state` (`state`),
  KEY `idx_catid` (`catid`),
  KEY `idx_createdby` (`created_by`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=225 ;

--
-- Dumping data for table `jos_content`
--

INSERT INTO `jos_content` (`id`, `title`, `alias`, `title_alias`, `introtext`, `fulltext`, `state`, `sectionid`, `mask`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `publish_up`, `publish_down`, `images`, `urls`, `attribs`, `version`, `parentid`, `ordering`, `metakey`, `metadesc`, `access`, `hits`, `metadata`) VALUES
(1, 'About Us', 'about-us', '', '<p><h1>Welcome to INTERSOG!</h1><br /> <br /> INTERSOG is an international software construction company with extensive expertise in software product development. INTERSOG specializes in complete product life cycle that utilizes a partnership approach to client engagements. INTERSOG is focused on emerging technologies for mobile enterprise applications and LAMP.</p>\r\n<p>Specifically, INTERSOG will continue to be a leading developer of applications for the iPhone and Android as these platforms create a new computing paradigm.<br /><br />We provide cost-effective software solutions for both startups and mainstream tech companies by leveraging our near-shore and offshore development centers.<br /><br /> INTERSOG specialiizes in complete product life cycles that utilize a partnership approach to client engagements, We focus on emerging technologies for a full range of cutting-edge IT development services and turnkey solutions, including:</p>\r\n<ul>\r\n<li>Android Applications</li>\r\n<li>Business Analysis and IT Consulting</li>\r\n<li>Custom Software, Database and Web Development</li>\r\n<li>Design, Implementation, Integration, Maintenance, Testing and Support</li>\r\n<li>Educational Software</li>\r\n<li>Enterprise Application Integration Services</li>\r\n<li>IBM iSeries Web Applications</li>\r\n<li>J2EE and Java</li>\r\n<li>LAMP and PHP</li>\r\n<li>Microsoft .Net</li>\r\n<li>Mobile/iPhone Applications</li>\r\n<li>Outsourcing</li>\r\n<li>Open Source Projects</li>\r\n<li>Supply Chain Management</li>\r\n</ul>', '', 1, 3, 0, 1, '2011-04-11 12:36:19', 62, '', '2011-04-18 11:34:03', 62, 0, '0000-00-00 00:00:00', '2011-04-11 12:36:19', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 4, 0, 1, '', '', 0, 23, 'robots=\nauthor='),
(2, ' Company Overview', 'company-overview', '', '<p>Welcome to the new face of Mobile Application Development. We are Intersog.              Headquartered in Chicago, Illinois, we are a leading maker of next generation Mobile              Applications for the iPhone, iPad, Blackberry, Android and Symbian platforms.</p>\r\n<p> </p>\r\n<p>Our primary goal is to deliver the highest quality products and service to our customers. Let us show you how we              can exceed your expectations every step of the way.</p>', '', 1, 1, 0, 5, '2011-04-11 14:08:18', 62, '', '2011-04-13 15:39:16', 62, 0, '0000-00-00 00:00:00', '2011-04-11 14:08:18', '0000-00-00 00:00:00', '', '', 'show_title=0\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 12, 0, 1, '', '', 0, 0, 'robots=\nauthor='),
(3, 'News 1', 'news-1', '', '<p>News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1News 1</p>', '', -2, 9, 0, 23, '2011-04-15 15:47:07', 62, '', '2011-04-15 15:48:06', 62, 0, '0000-00-00 00:00:00', '2011-04-15 15:47:07', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 2, 0, 0, '', '', 0, 1, 'robots=\nauthor='),
(4, 'iPhone & Android developers conference ', 'iphone-a-android-developers-conference-', '', '<p><img src="http://www.intersog.com/images/blogimg/ios_icon.png" border="0" alt="iOS development" width="100" height="63" style="forpost: right; float: left; margin-bottom: 1em; margin-right: 2em;" /> International company INTERSOG invites Objective C developers, as well as anyone who has certain interest and experience in developing iPhone and Android apps to attend a conference that will take place on March 19, 2011 in Nikolaev, Ukraine.<br /><br /> This event will provide a unique opportunity to learn from author presentations, addressing various aspects of mobile applications/games development. You will hear presentations dedicated to programming, testing, usability and other aspects of our daily work.<br /><br /> <img src="http://www.intersog.com/images/blogimg/android_icon.png" border="0" alt="Android Development" width="100" height="100" style="forpost: left; float: right; margin-bottom: 1em; margin-right: 2em;" /> This conference will focus not only on developers but on analysts, beta testers, managers, as well as everyone interested and involved in mobile apps/games marketing.<br /><br /> Specifically for this conference we are inviting the best specialists, who will gladly share their experience with you, including our American and Canadian colleagues. <br /><br /> Aside from presentations you will be able to share your experience during coffee breaks in a friendly, informal environment. <br /><br /> This conference will benefit anyone who considers their own professional growth as an important factor and cares about an industry progress as a whole.<br /><br /> Come and bring anyone interested in iPhone and Android app development.<br /><br /> Date and time - March 19, 2011 at 11:00am<br /> Place - Nikolaev, Ukraine.  Venu to be determined<br /> The conference program will be available in the near future.<br /> Admission - Free.<br /> Linkedin event <a href="http://events.linkedin.com/iPhone/pub/574448" target="_blank">http://events.linkedin.com/iPhone/pub/574448</a><br /> Facebook group  <a href="http://www.facebook.com/home.php?sk=group_155942534459149&amp;ap=1" target="_blank">http://www.facebook.com/home.php?sk=group_155942534459149&amp;ap=1</a></p>', '', -2, 9, 0, 23, '2011-04-17 17:14:12', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-17 17:14:12', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 0, '', '', 0, 1, 'robots=\nauthor='),
(5, 'Junior Mobile Software developer (Android, iPhone, Blackberry)', 'junior-mobile-software-developer-android-iphone-blackberry', '', '<p>Send resume (Word document) to <a href="mailto:jobs@intersog.com"><strong>jobs@intersog.com</strong></a></p>\r\n\r\n<p><strong>Location: Odessa , Nikolaev</strong></p>\r\n\r\n<p><strong>Required skills:</strong></p>\r\n<li>Deep understanding of the principles of object-oriented programming</li>\r\n<li>Ability to act as proactive team member</li>\r\n<li> Experience of working with mobile platforms is welcome, but not obligatory </li>', '', 1, 3, 0, 4, '2011-04-18 10:05:53', 62, '', '2011-04-18 10:36:20', 62, 0, '0000-00-00 00:00:00', '2011-04-18 10:05:53', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 2, 0, 8, '', '', 0, 1, 'robots=\nauthor='),
(7, 'Senior PHP developer', 'senior-php-developer', '', 'Obligatory knowledge of PHP5 (OOP)<br/>\r\nMore than 5 years of experience with PHP<br/>\r\nStrong knowledge of HTML/CSS, cross-browser JavaScript and Ajax (prototype, jQuery)<br/>\r\nApache HTTP Server<br/>\r\nMySQL<br/>\r\nKnowledge of version control systems (Subversion)<br/>\r\nExperience with Linux/Unix<br/>\r\nExperience with MVC architecture<br/>\r\nExperience with PHPUnit<br/>\r\nPHP Web-services<br/>\r\n<strong>Required skills:</strong><br/>\r\nFluent English<br/>\r\nability to work in the team<br/>\r\n<strong>Additional requirements:</strong><br/>\r\nExperience in ZEND Framework will be a plus<br/>\r\ncommunicability will be a plus<br/>', '', 1, 3, 0, 4, '2011-04-18 10:38:06', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 10:38:06', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 6, '', '', 0, 0, 'robots=\nauthor='),
(6, 'Mobile Software developer (Android, iPhone, Blackberry)', 'mobile-software-developer-android-iphone-blackberry', '', '<p>Send resume (Word document) to <a href="mailto:jobs@intersog.com"><strong>jobs@intersog.com</strong></a></p>\r\n\r\n<p><strong>Location: Odessa , Nikolaev</strong></p>\r\n\r\n<p><strong> Required skills:</strong></p>\r\n<ul>\r\n<li>Strong experience (minimum 2 years) in mobile software development for  Android, iPhone, Blackberry </li>\r\n<li> Ability to act as proactive team member</li>\r\n<li>Technical English</li>\r\n\r\nExperience of working with other mobile platforms is welcome.\r\nExperience of managing a team of developers is welcome.', '', 1, 3, 0, 4, '2011-04-18 10:31:35', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 10:31:35', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 7, '', '', 0, 1, 'robots=\nauthor='),
(8, 'PHP developer', 'php-developer', '', 'Obligatory knowledge of PHP5 (OOP) <br/>\r\nGood knowledge of HTML/CSS, cross-browser JavaScript and Ajax (prototype, jQuery)<br/>\r\nApache HTTP Server<br/>\r\nMySQL<br/>\r\nKnowledge of version control systems (Subversion)<br/>\r\nExperience with Linux/Unix<br/>\r\nExperience with MVC architecture<br/>\r\n<strong>Required skills:</strong><br/>\r\nFluent English<br/>\r\nability to work in the team<br/>\r\n<strong>Additional requirements:</strong><br/>\r\nExperience in ZEND Framework will be a plus<br/>\r\ncommunicability will be a plus<br/>', '', 1, 3, 0, 4, '2011-04-18 10:40:15', 62, '', '2011-04-18 10:40:37', 62, 0, '0000-00-00 00:00:00', '2011-04-18 10:40:15', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 2, 0, 5, '', '', 0, 0, 'robots=\nauthor='),
(9, 'Java Developer', 'java-developer', '', '<strong>Requirements:</strong><br/>\r\nExcellent knowledge Java 2 Standard Edition (J2SE) 5.0/6.0<br/>\r\nPrevious experience on real projects in the role of programmer<br/>\r\nExperience with existing open source systems (maven, etc.)<br/>\r\nExperience in working out the Web of appendices<br/>\r\nAcquaintance with Spring Framework<br/>\r\nAbility to understand independently the documentation and installation and operation process<br/>\r\nGood knowledge of English language (colloquial, written)<br/>\r\nHigher education<br/>\r\n<br/>\r\n<strong>Preferable personal characteristics:</strong><br/>\r\n\r\nResponsibility<br/>\r\nSystem approach<br/>\r\nOrientation to result<br/>\r\nIndependence<br/>\r\nEnthusiasm for work<br/>\r\nAbility to work effectively in a command to achieve objects in perspective<br/>\r\nAbility to work in dynamical working conditions<br/>', '', 1, 3, 0, 4, '2011-04-18 10:41:05', 62, '', '0000-00-00 00:00:00', 0, 62, '2011-04-18 10:41:23', '2011-04-18 10:41:05', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 4, '', '', 0, 1, 'robots=\nauthor='),
(10, 'Senior Java Developer', 'java-developer', '', '<strong>Requirements:</strong><br/>\r\nExcellent knowledge of Java 2 Standard Edition (J2SE) 5.0/6.0<br/>\r\nPrevious experience on real projects in the role of programmer and-or an analyst with experience<br/>\r\nfor not less than 3 years.<br/>\r\nExperience with existing open source systems (maven, etc.)<br/>\r\nExperience in working out the Web of appendices<br/>\r\nExperience in use of Tomcat, Spring Framework, JSF<br/>\r\nExperience in the Linux environment<br/>\r\nAbility to understand independently the documentation and installation and operation process<br/>\r\nGood knowledge of English language (colloquial, written)<br/>\r\nHigher education<br/>\r\n\r\n<strong>Preferable personal characteristics:</strong><br/>\r\nResponsibility<br/>\r\nSystem approach<br/>\r\nOrientation to result<br/>\r\nIndependence<br/>\r\nEnthusiasm for work<br/>\r\nAbility to work effectively in a command to achieve objects in perspective<br/>\r\nAbility to work in dynamical working conditions<br/>', '', 1, 3, 0, 4, '2011-04-18 10:41:05', 62, '', '2011-04-18 10:42:15', 62, 0, '0000-00-00 00:00:00', '2011-04-18 10:41:05', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 2, 0, 3, '', '', 0, 1, 'robots=\nauthor='),
(11, 'Product Marketing Manager', 'product-marketing-manager', '', '<p>A leading multinational mobile Publishing company ComboApp is seeking a highly motivated\r\nproduct manager to help define ComboApp mobile product offerings. Position will involve\r\nhelping to refine the mobile product strategy, performing competitor and market analysis,\r\ncustomer segmentation and persona development, product definition, and defining and tracking\r\nsuccess metrics. This is a full time direct-hire Product Marketing Manager opening which\r\nrequires some online/mobile/marketing/PR experience. The ideal candidate will have extensive\r\ndirect response experience exponentially growing an ecommerce business via all available online\r\nand offline marketing channels - including a solid understanding of SEM/PPC, SEO, Affiliate,\r\nEmail Marketing, Social Media.</p>\r\n\r\n<strong>Requirements:</strong><br/>\r\n1. Prior experience selling mobile or web, digital media solutions/products<br/>\r\n2. Understanding of the mobile, web, digital content/apps<br/>\r\n3. Excellent time management skills - brings to the position outstanding organizational skills and\r\nthe ability to handle multiple projects simultaneously while meeting rotating deadlines<br/>\r\n4. Fluent/Native English<br/>\r\n5. Strong writing and analytical skills<br/>\r\n\r\n6. Deep immersion in the online community world - knowledge of the do''s and don''ts of\r\nengagement<br/>\r\n7. Solid understanding of consumer research, data mining, product strategy, pricing, and online\r\npromotion<br/><br/>\r\n\r\n<strong>Responsibilities:</strong><br/>\r\n\r\n1. Build deal pipeline and manage to a monthly financial forecast<br/>\r\n2. Increase product lines'' sales<br/>\r\n3. Manage the marketing process, including the creation of online, mobile web, and on-air\r\npromotions<br/>\r\n4. Work closely with our Mobile team on the strategy for our mobile-first initiatives, as well as\r\nwith the product teams that have released and are releasing mobile apps<br/>\r\n5. Track record of building online communities and driving brand conversations<br/>\r\n6. Manage the entire sales process<br/>\r\n7. Consistently evaluate the visibility and brand recognition<br/>\r\n8. Set and periodically re-evaluate social media strategy<br/>', '', 1, 3, 0, 4, '2011-04-18 10:42:27', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 10:42:27', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 2, '', '', 0, 0, 'robots=\nauthor='),
(12, 'User Interface Designer', 'user-interface-designer', '', '<p>IT company, engaged in the production of own applications for smartphones (Apple, Android, BlackBerry, Phone7), is searching for User Interface Designer.</p>\r\n\r\n<strong>What You''ll Do</strong><br/>\r\n\r\n1. Create production-quality visual assets and icons for the development teams<br/>\r\n2. Create promo screens and banners<br/>\r\n4. Maintain and develop Design of companies web site (banners,menus, buttons, logo etc.)<br/>\r\n<br/>\r\nThe main task is creating beautiful 3D looking application icons.<br/>\r\nYou must have creative thinking and approach.<br/>\r\nYou will work in the team, that creates and publishes applications on the market.<br/>\r\nYou will need to meet important deadlines and keep up with a production schedule<br/><br/>\r\n\r\nOffice in downtown.<br/>\r\nThe schedule is flexible enough.<br/>\r\n5-day workweek<br/>', '', 1, 3, 0, 4, '2011-04-18 10:45:17', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 10:45:17', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 1, '', '', 0, 0, 'robots=\nauthor='),
(124, 'INTERSOG and Lise Bourbeau: bringing inspiration to the iPhone.', '', '', '<div style="margin: 0in 0in 0pt">INTERSOG, the market leader in mobile application development, is excited to announce a collaborative project with internationally renowned author, speaker and personal development expert <a target="_blank" href="http://leseditionsetc.homestead.com/engLB.html"><font color="#800080">Lise Bourbeau</font></a>.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt">Ms. BourbeauÃ¢â‚¬â„¢s best-selling inspirational books have been translated into 17 languages, with more than 2 million copies sold world-wide.&#160;She is the founder of the <i>Listen to Your Body</i> school, which currently operates conferences and workshops in a dozen countries, where Ms. Bourbeau teaches her philosophy of rediscovering and utilizing unconditional love.&#160;INTERSOG will develop 3 of Ms. BourbeauÃ¢â‚¬â„¢s most popular titles for release on iTunes, making her uplifting message accessible to everyone.&#160;&#160;</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b>Heal your wounds and find your true self</b> identifies the causes of hurt that lead to all of our physical, emotional and mental problems.&#160;By identifying these sources and the masks we create to hide the pain, the book offers practical solutions to lead you on the road to recovery and to reclaim your true self.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b>Listen to your body</b> is Ms. BourbeauÃ¢â‚¬â„¢s ground-breaking self-help book that helps you build a dynamic relationship with the most important person in your life: yourself.&#160;Through step-by-step instruction, Ms. Bourbeau provides the tools to build a solid foundation for life.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div><b>Your Body''s telling you - Love yourself</b> teaches that the key to healing yourself physically is to first heal yourself emotionally.&#160;By listening to the cues your body is sending, you can correct these imbalances and return to a path of love and harmony<span style="font-size: 12pt">.</span></div>\r\n<p><span style="font-size: larger"><span style=""><span style="">Look for each of these exciting apps, available soon for the iPhone and iPod Touch.</span></span></span><span style="font-size: 12pt">&#160;</span>\r\n<p>&#160;</p>\r\n<div><br />\r\n&#160;</div>\r\n</p>', '', 1, 9, 0, 23, '2009-04-10 10:45:45', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-04-10 10:42:09', '0000-00-00 00:00:00', '', '', '', 1, 0, 79, '', '', 0, 3345, ''),
(108, 'INTERSOG birthday celebration', '', '', '<font size="2">\r\n<p>NTERSOG''s 3rd Birthday Party was a blast. <br />\r\n<br />\r\nHere are some photos:</p>\r\n</font>', '<p style="text-align: center;"><img width="450" height="221" src="http://www.intersog.com/birth.jpg" alt="" /></p>\r\n<p>&#160;</p>\r\n<p style="text-align: center;"><img width="450" height="299" src="http://www.intersog.com/DSC_0022.jpg" alt="" /><br />\r\n<br />\r\n<img width="450" height="299" src="http://www.intersog.com/DSC_0070.jpg" alt="" /><br />\r\n<br />\r\n<img width="450" height="299" src="http://www.intersog.com/DSC_0083(2).jpg" alt="" /></p>', 1, 9, 0, 23, '2008-12-01 12:02:57', 66, '', '2008-12-05 06:20:24', 66, 0, '0000-00-00 00:00:00', '2008-12-01 11:56:38', '0000-00-00 00:00:00', '', '', '', 8, 0, 89, '', '', 0, 4239, ''),
(113, 'Migration to Gmail', '', '', '<p>Intersog''s migration to Gmail provides users with a set of powerful communication tools, with many features not available in other e-mail services.<br />\r\n<br />\r\n&#160;Messages containing the same subject line are grouped together.&#160; This creates "conversations" where all previous messages on the subject can be easily tracked and referenced.</p>\r\n<p>The incredible storage capacity of Gmail (currently 2500mb) means the typical user can store several years of messages without having to worry about deleting messages to save space.</p>\r\n<p>Gmail also provides a variety of search options.&#160; The integrated Google search provides fast, accurate results.&#160; Searches can also be conducted by label, date range and a host of other options.</p>\r\n<p>The migration to Gmail should benefit us all, by allowing us to communicate both faster and more efficiently.</p>', '<p><br />\r\n&#160;</p>', 1, 9, 0, 23, '2009-01-29 10:54:42', 69, '', '2009-01-30 09:48:24', 66, 0, '0000-00-00 00:00:00', '2009-01-29 10:47:48', '0000-00-00 00:00:00', '', '', '', 4, 0, 85, '', '', 0, 3460, ''),
(114, 'Latest Psychology and Mind Quest Apps.', '', '', 'Intersog LLC introduces 2 exciting new applications for the iPhone and iPod Touch: <strong>Psychology </strong>and <strong>Mind Quest</strong><br />\r\n<br />\r\n<p><strong>Psychology </strong>features 14 in-depth psychometric tests, each designed to delve into a separate aspect of personality.&#160; The tests cover a wide-range of topics from love and sexuality to stress and leadership and so&#160;much more.&#160; The ensuing results are as revealing as they are entertaining, often uncovering unexpected truths about a user''s personality.<br />\r\n<br />\r\nA&#160;fun tool for self-analysis, <strong>Psychology </strong>is even more enjoyable as you&#160;try these tests&#160;on&#160;family and friends.&#160;Current tests are updated and new tests are also added regularly, so the experience always remains fresh.&#160;<br />\r\n<br />\r\n<br />\r\n<strong>Mind Quest </strong>comprises a series of imaginitive tests, based on the fascinating concepts of Relational Psychology.&#160;&#160;Users are transported to far away worlds, where&#160;a&#160;set of unique situations takes them on a journey&#160;of self-discovery.&#160; <br />\r\n<br />\r\nFrom&#160;far-away castles, to secluded hideaways, users choose from a series&#160;of 4 quests, where the answers to&#160;a series of seemingly broad questions ultimately lead to more intimate personal truths.&#160; Beautifully rendered, with stunning graphics,&#160;<strong>Mind Quest </strong>stimulates both the mind and the senses.<br />\r\n<br />\r\n***<strong><span style="color: #ff0000">Love Quest</span></strong>--one of the entertaining <strong>Mind Quest </strong>adventures--is <span style="color: #ff0000"><strong>Free!</strong></span><strong> </strong>for a limited time.&#160; Be sure to download it today.***&#160;<br />\r\n<br />\r\nBoth <strong>Psycology </strong>and <strong>Mind Quest </strong>are currently available in the "Apps Store" section of the iTunes Store.<br />\r\n&#160;</p>', '<p>&#160;</p>', 1, 9, 0, 23, '2009-02-02 15:11:42', 69, '', '2009-02-27 09:32:05', 69, 0, '0000-00-00 00:00:00', '2009-02-02 14:18:52', '0000-00-00 00:00:00', '', '', '', 2, 0, 84, '', '', 0, 3230, ''),
(117, 'IntersogÃ¢â‚¬â„¢s Pocket MBA leads the mLearning Revolution', '', '', '<div style="margin: 0in 0in 0pt">Mobile Learning (or mLearning) is quickly being recognized as an essential tool in the overall training and learning process.&#160;The convenience and portability of mLearning tools brings many advantages over traditional training methods.&#160;As the buzz around mLearning grows, organizations and individuals are seeking new ways to utilize this exciting technology to assist in training employees and to gain a competitive advantage.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b>Intersog</b>, an industry leader in the development of cutting-edge mobile applications, brings the power of mLearning to life today with the <b>Pocket MBA</b> suite of interactive self-tests.&#160;An essential learning resource for business professionals, students and investors, <b>Pocket MBA</b> concentrates a wealth of high-level business information into a series of concise and comprehensive, engaging and interactive self-test applications.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b>Pocket MBA</b> is based on the works of Dr. Jae K. Shim, a best-selling author, professor CEO and one of the most respected names in his field.&#160;Each topic within the suite of tests acts as a stand-alone unit, systematically guiding users through the learning process.&#160;Thorough explanations are provided for each answer, results can be saved and viewed to track progress and questions can be shuffled to maximize the mLearning benefit.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b>Pocket MBA</b> Tests include:</div>\r\n<ul style="margin-top: 0in" type="disc">\r\n    <li style="margin: 0in 0in 0pt">Basic Business Essentials</li>\r\n    <li style="margin: 0in 0in 0pt">Concepts and Strategies</li>\r\n    <li style="margin: 0in 0in 0pt">Accounting and Finance</li>\r\n    <li style="margin: 0in 0in 0pt">101 Financial Solutions</li>\r\n    <li style="margin: 0in 0in 0pt">Cost Analysis</li>\r\n    <li style="margin: 0in 0in 0pt">Effective Business Communications</li>\r\n    <li style="margin: 0in 0in 0pt">Legal Environments of Business</li>\r\n    <li style="margin: 0in 0in 0pt">Understanding the Economy</li>\r\n    <li style="margin: 0in 0in 0pt">Sarbanes-Oxley Act and Corporate Governance</li>\r\n</ul>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b>Pocket MBA</b> is currently available for the iPhone and iPod Touch (2<sup>nd</sup> generation) and downloadable through the&#160;iTunes App Store.&#160;Once downloaded, no internet connection is needed, so users are truly empowered to control the learning process anytime, anywhere and at the userÃ¢â‚¬â„¢s own pace.&#160;The mLearning revolution is here and the <b>Pocket MBA</b> series of tests from <b>Intersog</b> is leading the way.</div>', '', 1, 9, 0, 23, '2009-02-27 09:34:33', 69, '', '2010-01-19 03:14:22', 62, 0, '0000-00-00 00:00:00', '2009-02-27 09:32:20', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 4, 0, 83, '', '', 0, 4506, ''),
(118, 'Join us on LinkedIn, Facebook and Twitter!', '', '', '<div style="margin: 0in 0in 0pt">Please join <b>INTERSOG </b>on our newly formed groups on social networking sites <b><a href="http://www.linkedin.com/groups?gid=1821266"><font color="#800080">LinkedIn</font></a></b>, <b><a href="http://www.facebook.com/group.php?gid=53080634933"><font color="#800080">Facebook</font></a></b> and <b><a href="http://twitter.com/MobLearning"><font color="#800080">Twitter</font></a></b>.&#160;Now you can follow the latest updates, information and product developments, as well as stay on top of the latest technological trends in smart phone applications and Mobile Learning (mLearning).</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>', '<div style="margin: 0in 0in 0pt">The groups offer the chance to network with people from around the world who share similar interests and backgrounds.&#160;Gain a fresh perspective.&#160;Join in the discussion.&#160;Share your opinions and ideas or just follow along.&#160;Discussions will be updated regularly to keep you up to date and will cover a range of topics that directly affect the areas of mobile technology and mLearning.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt">We hope that you will become a part of our growing community dedicated to the advancement of these exciting technologies.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt">Please use the links above or below to join one of these groups.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b><a href="http://www.linkedin.com/groups?gid=1821266"><font color="#800080">LinkedIn</font></a></b>, <b><a href="http://www.facebook.com/group.php?gid=53080634933"><font color="#800080">Facebook</font></a></b>, <b><a href="http://twitter.com/MobLearning"><font color="#800080">Twitter</font></a></b></div>', 1, 9, 0, 23, '2009-03-06 10:14:16', 69, '', '2009-03-10 11:47:12', 66, 0, '0000-00-00 00:00:00', '2009-03-06 10:11:36', '0000-00-00 00:00:00', '', '', '', 4, 0, 82, '', '', 0, 3080, ''),
(120, 'Registration form ', '', 'Registration form ', 'Get your free copy of a complimentary extract from m-learning app (book, flash,  test) available soon on Appstore. <br />\r\n<br />\r\n<br />\r\n<br />\r\n<br />', '<strong>Please fill in the form below to register.</strong><br />\r\n<br />\r\n{chronocontact}feedback{/chronocontact}', 0, 9, 0, 23, '2009-03-23 15:07:53', 62, '', '2009-06-04 08:45:00', 62, 0, '0000-00-00 00:00:00', '2009-03-23 15:05:01', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 13, 0, 81, '', '', 0, 995, ''),
(121, 'INTERSOG and the Enneagram Institute Initiate Application Development Project', '', '', '<div style="margin: 0in 0in 0pt"><b>INTERSOG</b> and the Enneagram Institute are pleased to announce a partnership agreement that will lead to the development of multiple mobile applications for the highly popular Enneagram Personality Test.</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>', '<div style="margin: 0in 0in 0pt">The Enneagram Personality Test is a widely used and scientifically validated tool that provides users with a detailed psychological self-portrait.&#160;The Enneagram test not only identifies a personÃ¢â‚¬â„¢s dominant personality type, but also assesses a personÃ¢â‚¬â„¢s relative strengths and weaknesses across all 9 major personality types.&#160;Selected by <i>Time</i> magazine as one of the foremost personality tests, the Enneagram Personality Test is an entertaining and educational tool for anyone looking to increase their self-awareness or aid in their personal development.&#160;&#160;</div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><b>INTERSOG</b>, the market leader in mobile computing applications, will develop applications for both a full and short version of the Enneagram Personality Test.&#160;The short version will consist of 36 forced-choice questions and will provide users with a general personality assessment that can be completed with minimal effort.&#160;The full version of the Enneagram Personality Test contains 144 multiple choice questions that will yield a more comprehensive evaluation of a userÃ¢â‚¬â„¢s personality classification.&#160;Detailed explanations of the results provide users with their major personality traits relative to them, as well as specific sources of conflict and the dominant instincts related to their personality type.</div>', 1, 9, 0, 23, '2009-03-26 10:36:30', 69, '', '2009-03-26 11:07:15', 66, 0, '0000-00-00 00:00:00', '2009-03-26 10:33:53', '0000-00-00 00:00:00', '', '', '', 2, 0, 80, '', '', 0, 3052, ''),
(125, 'Learning To-Go: Books + Flashcards + Interactive Tests = a Complete mLearning Solution ', '', '', '<div style="margin: 0in 0in 0pt"><strong>Learning To-Go </strong>delivers a whole new level of mLearning to mobile applications, making the learning process more personal and powerful.&#160;<br />\r\n&#160;</div>\r\n<div style="margin: 0in 0in 0pt">Developed by the leader in mobile application development, INTERSOG, the <strong>Learning To-Go </strong>series combines an authoritative professional-level business course with the unprecedented convenience to control the pace of learning on your iPhone or iPod Touch. Combining a full-text course book, flashcards to review key concepts and interactive self-tests, each <strong>Learning To-Go </strong>provides a complete and easy to use user-controlled learning solution.<br />\r\n&#160;</div>\r\n<div style="margin: 0in 0in 0pt">Each <strong>Learning To-Go </strong>app includes a complete course text <strong>book</strong>, systematically divided among chapter and topic areas. Text is written clearly in plain English and complemented by numerous charts, graphs and examples. <br />\r\n&#160;</div>\r\n<div style="margin: 0in 0in 0pt">Helpful <strong>flashcards</strong> supplement the course text and are invaluable for reviewing key terms and concepts. And to complete the learning process, comprehensive interactive self-<strong>tests</strong> are included after each chapter. Detailed explanations are provided for each right or wrong answer and test results can be saved so you can track your progress.<br />\r\n&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><strong>Learning To-Go</strong> apps are based on the courses developed by Dr. Jae K. Shim. Dr. Shim is a professor of Accounting and Finance at CSU-Long Beach, CEO of Delta Consulting and best-selling author of over 50 best-selling academic and professional titles.</div>\r\n<div style="margin: 0in 0in 0pt"><strong><br />\r\nLearning To-Go </strong>changes the game for mLearning, bringing you the most reliable and complete learning solutions on the market today. Please visit our link on the iTunes App Store to learn more about these exciting new products.</div>\r\n<div style="margin: 0in 0in 0pt"><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=313338528&amp;mt=8"><font color="#800080">http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=313338528&amp;mt=8</font></a></div>', '', 1, 9, 0, 23, '2009-04-30 11:30:40', 69, '', '2009-04-30 12:09:48', 69, 0, '0000-00-00 00:00:00', '2009-04-30 11:28:45', '0000-00-00 00:00:00', '', '', '', 5, 0, 78, '', '', 0, 3245, ''),
(127, 'Intersog Expands U.S. Headquarters', '', '', '<div style="margin: 0in 0in 10pt">To accommodate a rapid growth in business, INTERSOG LLC has relocated their U.S. headquarters to a new Chicago, Illinois facility.&#160;Part of a planned expansion project, the move places INTERSOG in the cityÃ¢â‚¬â„¢s West Loop district, home to a large concentration of innovative high-tech companies such as <a target="_blank" href="http://www.gorillachicago.com/">Gorilla Polymedia</a>.&#160;</div>', 'The larger office space, located at 1019 W Lake Street, provides INTERSOG with the technological infrastructure to support all current and future business needs as well as access to ChicagoÃ¢â‚¬â„¢s deep and highly skilled talent pool.&#160;The new offices will allow INTERSOG to continue their aggressive product development schedule, while still delivering cutting edge mobile applications for the iPhone, Blackberry and Android platforms.\r\n<div style="margin: 0in 0in 10pt">Correspondence&#160;may still be sent to the following address:</div>\r\n<div style="margin: 0in 0in 0pt">INTERSOG</div>\r\n<div style="margin: 0in 0in 0pt">47 W Division St. Ste. 115</div>\r\n<div style="margin: 0in 0in 0pt">Chicago, IL 60610</div>', 1, 9, 0, 23, '2009-06-18 09:51:50', 69, '', '2009-06-19 07:13:40', 69, 0, '0000-00-00 00:00:00', '2009-06-18 09:49:02', '0000-00-00 00:00:00', '', '', '', 6, 0, 77, '', '', 0, 2874, ''),
(128, 'INTERSOG on Macworld', '', '', '<div style="margin: 0in 0in 10pt;">As of July 1, look for <b>INTERSOG</b> on the <a href="http://www.macworld.com/appguide/index.html">Macworld</a> App Guide.&#160;The Macworld App Guide is the number 1 destination for the global iPhone and iPod Touch community, providing information about the latest trends and products.&#160;<a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=314870744&amp;mt=8"><b>Learning To-Go: Accounting and Finance</b></a> will be a featured app in the <a href="http://www.macworld.com/appguide/browse.html?cat=Business">Business</a> section of the App Guide, giving us a prominent placement and allowing us to reach a whole new audience among the thousands of users who visit the Macworld App Guide every day.&#160;</div>\r\n<div style="margin: 0in 0in 10pt;">The increased exposure will allow us to fully promote our innovative and integrated line of <b>Learning To-Go</b> apps, which are optimized for the iPhone and iPod Touch.&#160;Based on courses created by professor and best-selling author Dr. Jae K. Shim, <b>Learning To-Go</b> provides complete line professional-level business course, combined with the unprecedented flexibility of a user-controlled learning experience.&#160;Look for <b>Learning To-Go: Accounting and Finance</b> and all the exciting <strong>INTERSOG </strong>apps in the Macworld App Guide.</div>', '<br type="_moz" />', 1, 9, 0, 23, '2009-07-02 09:21:11', 69, '', '2009-07-03 05:16:26', 62, 0, '0000-00-00 00:00:00', '2009-07-02 09:19:14', '0000-00-00 00:00:00', '', '', '', 2, 0, 76, '', '', 0, 2775, ''),
(129, 'Learning To-Go: Making Blackberry and Nokia Smart Phones Smarter', '', '', '<div style="margin: 0in 0in 10pt"><b>Learning To-Go</b> changed the game for Mobile Learning on the iPhone and iPod Touch.&#160;Now, that same full-featured functionality and intuitive design has been optimized for the <b>Blackberry</b>Ã‚Â® and <b>Nokia</b> SymbianÃ‚Â® platforms.</div>\r\n<div style="margin: 0in 0in 10pt"><b>Learning To-Go</b> consists of a full line of professional-level business courses developed by noted professor and best-selling author of over 50 academic and professional titles Dr. Jae K. Shim.&#160;Each course is innovatively designed to create a personalized and completely user-controlled educational experience.&#160;The integrated course materials contain the full course book, interactive flashcards to review key points and comprehensive self-tests to assess learning.&#160;Additionally, the courses have an array of added features like explanations for correct and incorrect answers, the ability to bookmark a location and save and review test results.</div>\r\n<div style="margin: 0in 0in 10pt">Using our proprietary development process we have customized our <b>Learning To-Go </b>apps to take advantage of the unique capabilities of both the Blackberry and Nokia Symbian platforms.&#160;From Accounting to Taxation, <b>Learning To-Go</b> has a course ideal for a wide-range of individuals and organizations.&#160;Look for all our educational and entertaining applications on the Blackberry and Symbian app stores.&#160;<strong>INTERSOG </strong>makes your smart phone smarter.</div>', '', 1, 9, 0, 23, '2009-07-02 10:06:00', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-07-02 10:03:16', '0000-00-00 00:00:00', '', '', '', 1, 0, 75, '', '', 0, 2672, ''),
(132, 'Pocket MBA Grades an Ã¢â‚¬Å“AÃ¢â‚¬Â', '', '', '<div style="margin: 0in 0in 10pt"><span style="line-height: 115%; font-size: 12pt">The grades are in and our <b>Learning To-Go: Pocket MBA </b>application has received an Ã¢â‚¬Å“AÃ¢â‚¬Â from <i><a href="http://www.iphoneappsfinder.com/video/pocket-mba/">iPhone Apps Finder</a></i>, a leading independent source of unbiased mobile application reviews.&#160;In giving their highest rating, <i>iPhone Apps Finder</i> praised Pocket MBA for its exceptional value and comprehensive content.&#160;Recommending Pocket MBA for a variety of professionals and prospective business students, the reviewer noted that the course Ã¢â‚¬Å“gives you an overview of how to run a business like a proÃ¢â‚¬Â and overall is Ã¢â‚¬Å“a big fan of Pocket MBAÃ¢â‚¬Â.</span></div>\r\n<div style="margin: 0in 0in 10pt"><span style="line-height: 115%; font-size: 12pt">Pocket MBA is just one in our line of Learning To-Go apps, which combine full-text books, interactive flashcards and comprehensive tests to create complete learning solutions for a wide-range of business topics.&#160;Learn more about Learning To-Go: Pocket MBA at the iTunes app store.&#160;</span></div>', '', 1, 9, 0, 23, '2009-07-23 12:50:08', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-07-23 12:46:33', '0000-00-00 00:00:00', '', '', '', 1, 0, 73, '', '', 0, 2962, ''),
(134, 'Iphoneness.com Recommends Learning To-Go', '', '', '<div style="margin: 0in 0in 10pt">Chicago, IL Ã¢â‚¬â€œ Add <b>Iphoneness.com</b> to the growing list of admirers of <b>INTERSOGÃ¢â‚¬â„¢s</b> <b><span style="color: #0070c0">Learning To-Go</span></b> line of fully integrated professional-level business applications.&#160;Impressed by both the creativity and content found in these apps, Iphoneness.com, a leading blog covering all facets of the iPhone, concludes that <b><span style="color: #0070c0">Learning To-Go </span></b>is a Ã¢â‚¬Å“great way to build up your business knowledge and take your game to the next level.Ã¢â‚¬Â</div>\r\n<div style="margin: 0in 0in 10pt">Combining full-course text <em>Books&#160;</em>with interactive <em>Flash Cards </em>and chapter-level <em>Tests</em>, <b><span style="color: #0070c0">Learning To-Go </span></b>provides a completely integrated learning solution for an array of business topics.&#160;Whether youÃ¢â‚¬â„¢re interested in Investing, Real Estate, Finance or any other area of business, <b><span style="color: #0070c0">Learning To-Go </span></b>has an informative, convenient and authoritative app for you.&#160;Click below to find more information on any of the Ã¢â‚¬Å“coolÃ¢â‚¬Â apps in the <b><span style="color: #0070c0">Learning To-Go </span></b>series that iphoneness.com recommends.</div>\r\n<div style="margin: 0in 0in 10pt"><b><span style="color: #0070c0">Learning To-Go:</span></b></div>\r\n<div style="margin: 0in 0in 10pt"><a target="_blank" href="http://bit.ly/dxt8i"><font color="#0000ff">Pocket MBA</font></a></div>\r\n<div style="margin: 0in 0in 10pt"><a target="_blank" href="http://bit.ly/2j8DGE"><font color="#0000ff">Business essentials</font></a></div>\r\n<div style="margin: 0in 0in 10pt"><a target="_blank" href="http://bit.ly/zxlWI"><font color="#0000ff">Accounting &amp; Finance</font></a></div>\r\n<div style="margin: 0in 0in 10pt"><a target="_blank" href="http://bit.ly/DgX7l"><font color="#0000ff">Real Estate Investing</font></a></div>\r\n<div style="margin: 0in 0in 10pt"><a target="_blank" href="http://bit.ly/Sq4Lo"><font color="#0000ff">Small Business Guide</font></a></div>\r\n<div style="margin: 0in 0in 10pt"><a target="_blank" href="http://bit.ly/3dqW8"><font color="#0000ff">Real Estate Dictionary</font></a></div>\r\n<div style="margin: 0in 0in 10pt"><a target="_blank" href="http://bit.ly/GGaqR"><font color="#0000ff">Marketing Process</font></a></div>\r\n<div style="margin: 0in 0in 10pt"><a href="http://bit.ly/sG6dI"><font color="#0000ff">101 Financial solutions</font></a></div>', '', 1, 9, 0, 23, '2009-08-07 11:46:45', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-08-07 11:42:43', '0000-00-00 00:00:00', '', '', '', 1, 0, 72, '', '', 0, 3030, ''),
(135, 'Learning To-Go and Macworld', '', '', '<div style="margin: 0in 0in 10pt">With a print and online circulation of over 5 million per month, Macworld is the preeminent forum for Apple, Mac and iPhone users around the world.&#160;With a suite of 8 professional-level business courses, our <a href="http://mobile.intersog.com/category/business/">Learning To-Go</a> series is the preeminent Mobile Learning resource on the market.&#160;As <b>INTERSOG </b>spreads the message about our innovative mLearning applications, look for our ad in the September issue of Macworld magazine and as a featured app on MacworldÃ¢â‚¬â„¢s <a href="http://www.macworld.com/appguide/index.html">App Guide</a>.</div>\r\n<div style="margin: 0in 0in 10pt">Learning To-Go brings a one-of-a-kind learning experience to your iPhone or iPod Touch.&#160;Based on authoritative source material, each Learning To-Go app provides a complete educational experience, combined with the convenience to control the pace of learning.&#160;Each course combines a full-text book, integrated flashcards to review key concepts and chapter-level interactive tests.&#160; All this, plus a host of added features mean:&#160;when you need to know, trust Learning To-Go.</div>', '', 1, 9, 0, 23, '2009-08-26 08:37:25', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-08-26 08:32:07', '0000-00-00 00:00:00', '', '', '', 1, 0, 71, '', '', 0, 2423, ''),
(136, 'ad:tech Chicago 2009', '', '', '<div style="margin: 0in 0in 10pt">Chicago, IL Ã¢â‚¬â€œ For over a decade, the global series of ad:tech conferences has brought together the brightest minds in media, marketing and technology.&#160;Currently taking place at Navy Pier, <a href="http://www.ad-tech.com/chicago/adtech_chicago.aspx">ad:tech Chicago</a> provides a unique forum to network with industry professionals, share best-practices and learn the latest tools, techniques and trends.&#160;With access to some of the industryÃ¢â‚¬â„¢s key influencers and an innovative program of workshops and panel discussions, ad:tech Chicago provides the information needed to stay on the cutting edge of the cutting edge.</div>\r\n<div style="margin: 0in 0in 10pt">INTERSOG is well represented at this yearÃ¢â‚¬â„¢s event, with members of the marketing and sales teams joined by CEO Vadim Chernega and Head of Marketing, Julia Guzunova.&#160;At the end of the two day conference, we hope to come away with an array of new friends and new ideas.&#160;Success in the digital age is determined by the ability to adapt to and take advantage of an ever-changing environment.&#160;ThatÃ¢â‚¬â„¢s why we are committed to continuing learning through events like ad:tech Chicago and to bringing Mobile Learning to users everywhere through our innovative Learning To-Go <a href="http://mobile.intersog.com/category/business/">applications</a>.<br />\r\n&#160;</div>\r\n<div style="text-align: center; margin: 0in 0in 10pt"><img alt="ad:tech" src="http://www.ad-tech.com/images/global/logo_adtech.gif" width="329" height="56" /></div>', '', 1, 9, 0, 23, '2009-09-01 15:46:02', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-09-01 15:38:39', '0000-00-00 00:00:00', '', '', '', 1, 0, 70, '', '', 0, 2532, '');
INSERT INTO `jos_content` (`id`, `title`, `alias`, `title_alias`, `introtext`, `fulltext`, `state`, `sectionid`, `mask`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `publish_up`, `publish_down`, `images`, `urls`, `attribs`, `version`, `parentid`, `ordering`, `metakey`, `metadesc`, `access`, `hits`, `metadata`) VALUES
(137, 'INTERSOG Game Studio: Get Ready to Play', '', '', '<div style="margin: 0in 0in 10pt"><b>INTERSOG</b>, the leader in mobile application development, has launched an in-house team dedicating to producing the finest quality gaming apps for the iPhone and iPod Touch.&#160;<b>INTERSOG Game Studio</b> will set the standard for mobile gaming excitement for both casual and hard-core gamers.&#160;With their upcoming release, <b><span style="color: #0070c0">Bar Rush</span></b>, expect an immersive and entertaining gaming experience that will make for hours of frenzied game play.</div>\r\n<div style="margin: 0in 0in 10pt"><b><span style="color: #0070c0">Bar Rush</span></b> will test your speed and the skill serving the thirsty patrons of a crowded nightclub.&#160;As the counter ticks, the pressure mounts.&#160;Keep your cool or you may find yourself as shaken as a martini.&#160;And as a bonus other games canÃ¢â‚¬â„¢t match, as you master <b><span style="color: #0070c0">Bar Rush</span></b>, youÃ¢â‚¬â„¢ll also master the recipes for dozens of popular cocktails, making Bar Rush one of the only Ã¢â‚¬Å“Lifestyle LearningÃ¢â‚¬Â games on the market. &#160;</div>\r\n<div style="margin: 0in 0in 10pt">A good bartender never reveals their secrets, so look for more news and details about <b><span style="color: #0070c0">Bar Rush</span></b> in the coming days.&#160;Cheers.<br />\r\n&#160;</div>', '', 1, 9, 0, 23, '2009-09-04 12:35:08', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-09-04 12:27:21', '0000-00-00 00:00:00', '', '', '', 1, 0, 69, '', '', 0, 2495, ''),
(139, 'Learning To-Go receives Ã¢â‚¬Å“Highest Seal of ApprovalÃ¢â‚¬Â', '', '', '<div style="margin: 0in 0in 10pt; text-align: center"><a target="_blank" href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=313338528&amp;mt=8"><img height="100" alt="" width="100" src="http://www.intersog.com/mzl_dlrbssqd_512x512-75(1).jpg" /></a></div>\r\n<div style="margin: 0in 0in 10pt; text-align: left"><br />\r\nThe accolades keep coming in for our suite of Learning To-Go apps. <a href="http://www.iworthitappreviews.com/2009/09/07/intersogs-learning-to-go-business-iphone-apps-review/">iWorth it App Reviews</a>, an independent website dedicated to providing advice on the best and worst iPhone apps available, has given Learning To-Go their Ã¢â‚¬Å“Highest Seal of ApprovalÃ¢â‚¬Â, a distinction only a few select applications can boast.</div>\r\n<div style="margin: 0in 0in 10pt">Recently updated, each Learning To-Go provides a complete professional-level business course integrated into a single application.&#160;Combining a full-text course book, interactive flashcards, comprehensive tests and an array of added features, Learning To-Go provides a complete educational experience.&#160;With courses covering all major business topics, when you need to know, trust Learning To-Go.</div>\r\n<div style="margin: 0in 0in 10pt">You can find all of our <a href="http://ax.search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?entity=software&amp;media=all&amp;restrict=true&amp;submit=seeAllLockups&amp;term=intersog+learning"><font color="#0000ff">Learning To-Go</font></a> apps on the iTunes App Store.<br />\r\n&#160;</div>\r\n<div style="margin: 0in 0in 10pt; text-align: center"><a target="_blank" href="http://www.iworthitappreviews.com/2009/09/07/intersogs-learning-to-go-business-iphone-apps-review/"><img height="41" alt="" width="362" src="http://www.intersog.com/iWorthIt(1).jpg" /></a>&#160;</div>', 'null', 1, 9, 0, 23, '2009-10-01 13:05:42', 69, '', '2009-10-02 08:14:32', 66, 0, '0000-00-00 00:00:00', '2009-10-01 12:58:17', '0000-00-00 00:00:00', '', '', '', 19, 0, 67, '', '', 0, 2470, ''),
(138, 'AppShouter Review: Business Law Test is Ã¢â‚¬Å“GreatÃ¢â‚¬Â', '', '', '<div style="margin: 0in 0in 10pt; text-align: center"><img height="100" alt="" width="100" align="middle" src="http://www.intersog.com/business law test.jpg" /></div>\r\n<div style="margin: 0in 0in 10pt">According to a recent review by <strong><a href="http://appshouter.com/iphone-app-review/iphone-app-review-%e2%80%93-business-law-test/#more-1690">AppShouter</a></strong>, Ã¢â‚¬Å“the <a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=306696642&amp;mt=8"><font color="#0000ff">Business Law Test</font></a> App is great for anyone interested in businessÃ¢â‚¬Â. With its Ã¢â‚¬Å“clean, slick interfaceÃ¢â‚¬Â and Ã¢â‚¬Å“intuitive and user-friendlyÃ¢â‚¬Â controls, The Business Law Test makes it easy for anyone to Ã¢â‚¬Å“learn business law topics.Ã¢â‚¬Â</div>\r\n<div style="margin: 0in 0in 10pt">The <u>Free</u> Business Law Test is just one of the many <strong>Pocket MBA</strong> applications that cover virtually every functional area of business, from Accounting to Taxation. Based on the work of Dr. Jae K. Shim, CSU-Long Beach professor of Business and best-selling author, the Business Law Test, and all our Pocket MBA apps, provides a quick, accurate and authoritative way to test your overall business knowledge or to challenge colleagues and friends.</div>\r\n<div style="margin: 0in 0in 10pt">For a complete Mobile Learning experience, try one of our many <a href="http://ax.search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?entity=software&amp;media=all&amp;restrict=true&amp;submit=seeAllLockups&amp;term=Learning+To-Go"><font color="#0000ff">Learning To-Go</font></a> apps, which integrate our comprehensive tests with full-text course books, interactive flashcards and array of enhanced features.</div>\r\n<div style="margin: 0in 0in 10pt">AppShouter is an independent website providing App reviews and iPhone news to Ã¢â‚¬Å“sort through the mass of new apps and find the diamonds in the rough.Ã¢â‚¬Â</div>\r\n<div style="margin: 0in 0in 10pt; text-align: center"><img height="110" alt="" width="209" src="iphone_background_top(1).jpg" /></div>', '', 1, 9, 0, 23, '2009-09-30 13:54:57', 69, '', '2009-10-01 05:08:39', 66, 0, '0000-00-00 00:00:00', '2009-09-30 13:47:20', '0000-00-00 00:00:00', '', '', '', 5, 0, 68, '', '', 0, 2785, ''),
(140, 'Learning To-Go Pocket MBA: #1 on App Store', '', '', '<div style="margin: 0in 0in 10pt; text-align: center"><font face="Trebuchet MS"><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=313338528&amp;mt=8"><img height="100" alt="Learning To-Go Pocket MBA" width="100" src="http://www.intersog.com/mzl_dlrbssqd_512x512-75(2).jpg" /></a><br />\r\n<br />\r\n</font></div>\r\n<div style="margin: 0in 0in 10pt"><font face="Trebuchet MS">London: The 2009 Handheld Learning Conference has generated quite a buzz for our Learning To-Go mLearning platform and for our Pocket MBA app.</font></div>\r\n<div style="margin: 0in 0in 10pt"><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=313338528&amp;mt=8"><font face="Trebuchet MS" color="#0000ff">Pocket MBA</font></a><font face="Trebuchet MS"> is currently the #1 business application in AppleÃ¢â‚¬â„¢s App Store.&#160;Pocket MBA, which is built on our Learning To-Go platform, combines a full-text course book, interactive flashcards and comprehensive tests to create a complete Mobile Learning solution.&#160;Available FREE for a limited time, Pocket MBA provides a professional-level business course with the mobility and flexibility to enhance professional development.&#160;Jump on the bandwagon and download Pocket MBA today.</font></div>\r\n<div style="margin: 0in 0in 10pt"><font face="Trebuchet MS">Also at the Handheld Learning Conference, Intersog announced licensing opportunities for our cross-platform Learning To-Go framework.&#160;With the Learning To-Go framework, porting applications across multiple smart phone platforms has never been easier.&#160;Now content providers everywhere can easily transform their information into cutting edge applications for the iPhone, Google Android, Blackberry and Symbian platforms.&#160;&#160;To learn more about how Learning To-Go can help expand your business, please contact us for more information @ </font><a href="mailto:contact@intersog.com"><font face="Trebuchet MS" color="#0000ff">contact@intersog.com</font></a>.<p><font face="Trebuchet MS"> ÃŽÂ¤o learn more about Learning To-Go framework download our </font><a href="www.intersog.com/Intersog Portfolio_LTG.pdf"><font face="Trebuchet MS" color="#0000ff">presentation</font></a></p></div>', '', 1, 9, 0, 23, '2009-10-06 13:16:09', 69, '', '2009-10-12 08:52:37', 62, 0, '0000-00-00 00:00:00', '2009-10-06 13:12:36', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 6, 0, 66, '', '', 0, 2540, ''),
(142, 'Bar Rush: Positive Reviews Keep Pouring In', '', '', '<div style="margin: 0in 0in 10pt">Already a <b>Ã¢â‚¬Å“What WeÃ¢â‚¬â„¢re PlayingÃ¢â‚¬Â</b> featured app on the iTunes App Store, the positive reviews keep pouring in for <b>Bar Rush</b>.&#160;With its mix of ultra-realistic game play, unreal characters and witty dialog, <b>Bar Rush</b> will test your speed and your skill while teaching you how to make over 80 authentic cocktails.</div>\r\n<div style="margin: 0in 0in 10pt">Read what the press is saying about <strong>Bar Rush</strong>:</div>\r\n<div style="margin: 0in 0in 10pt">Ã¢â‚¬Å“<i>With frantic gameplay and an interesting premise, Intersog serves up a winner.&#160;Overall, gameplay is a lot of fun and replay ability is high.&#160;Bar Rush is <b>highly recommended</b> for adult gamers who enjoy learning while having fun</i>.Ã¢â‚¬Â <b><a href="http://www.appsmile.com/2009/10/24/iphone-app-reviews-bar-rush-serves-up-frantic-gameplay-for-adult-crowd/"><font color="#0000ff">App Smile</font></a> </b>(5 of 5 Dimple Rating)</div>\r\n<div style="margin: 0in 0in 10pt">&#160;</div>\r\n<div style="margin: 0in 0in 10pt">Ã¢â‚¬Å“<i>If you like <b>fast-paced action</b>, quirky and often funny game play or simply want to learn how to make a wide variety of cocktails, Bar Rush is definitely worth a shot</i>.Ã¢â‚¬Â &#160;<b><a href="http://appshouter.com/iphone-app-review/iphone-app-user-review-%E2%80%93-bar-rush/"><font color="#0000ff">App Shouter</font></a></b></div>\r\n<div style="margin: 0in 0in 10pt">&#160;</div>\r\n<div style="margin: 0in 0in 10pt">Ã¢â‚¬Å“<b><i>Very engaging</i></b><i>.&#160;A different twist to the time-management game.&#160;A fun one to play</i>.Ã¢â‚¬Â&#160;<b><a href="http://www.topiphoneresource.info/bar-rush-game-review/">Top iPhone Resource</a> </b>(4 out of 5 Rating)</div>\r\n<div style="margin: 0in 0in 10pt">&#160;</div>\r\n<div style="margin: 0in 0in 10pt">Ã¢â‚¬Å“<i>One of the most <b>fun and challenging</b> games I have played in a long time</i>.Ã¢â‚¬Â <b><a href="http://pinkaplz.wordpress.com/2009/10/21/bar-rush-review/"><font color="#0000ff">PinkAplz iPhone Reviews</font></a> </b></div>\r\n<div style="margin: 0in 0in 10pt">&#160;</div>\r\n<div style="margin: 0in 0in 10pt">Ã¢â‚¬Å“<i>Challenging and entertaining time management game plus&#160;a <b>fun crash course on bartending</b>.&#160;Detailed graphics</i>.Ã¢â‚¬Â&#160;<b><a href="http://enuhskigamesiphone.blogspot.com/2009/10/bar-rush-for-iphone-and-ipod-touch.html"><font color="#0000ff">EnushkiÃ¢â‚¬â„¢s App Review Center<span style="font-weight: normal">&#160;</span></font></a></b></div>\r\n<div style="margin: 0in 0in 10pt"><b>&#160;</b></div>\r\n<div style="margin: 0in 0in 10pt">Ã¢â‚¬Å“<i>Nice graphics and good sound effectsÃ¢â‚¬Â¦<b>funny dialog</b>, and excellent, intuitive controls.&#160;An excellent game, with <b>high replay value</b></i>.Ã¢â‚¬Â&#160;<b><a href="http://www.playerzblog.com/fun-drinking-games.html"><font color="#0000ff">Playerz Blog </font></a>&#160;</b></div>\r\n<div style="margin: 0in 0in 10pt">&#160;</div>\r\n<div style="margin: 0in 0in 10pt">Looking for a shot of fun for your iPhone? Download <b>Bar Rush</b> today.</div>\r\n<div style="margin: 0in 0in 10pt"><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=333188691&amp;mt=8"><font color="#0000ff">http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=333188691&amp;mt=8</font></a></div>', '', 1, 9, 0, 23, '2009-10-26 15:04:57', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-10-26 15:02:49', '0000-00-00 00:00:00', '', '', '', 1, 0, 64, '', '', 0, 2209, ''),
(141, 'Bar Rush Featured in AppleÃ¢â‚¬â„¢s App Store', '', '', '<div style="margin: 0in 0in 10pt">With almost 100,000 apps currently for sale on the Apple iTunes App Store, only the best of the best can hope to make it to the top.&#160;ThatÃ¢â‚¬â„¢s why Intersog Game Studio is thrilled to announce that our <i>very first</i> <i>game</i>, <b>Bar Rush</b>, has been selected to AppleÃ¢â‚¬â„¢s Ã¢â‚¬Å“What WeÃ¢â‚¬â„¢re PlayingÃ¢â‚¬Â section.</div>\r\n<div style="margin: 0in 0in 10pt">To celebrate, itÃ¢â‚¬â„¢s Happy Hour on the App Store. Intersog Game Studio is holding a <b>Bar Rush</b> <b><span style="color: #0070c0">SALE for .99Ã‚Â¢ for a limited time</span></b>. (<a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=333188691&amp;mt=8"><font color="#0000ff">Click here</font></a> to experience the Rush now)&#160;Hurry, this offer wonÃ¢â‚¬â„¢t last long. <b><span style="color: #0070c0">&#160;</span></b></div>\r\n<div style="margin: 0in 0in 10pt"><b>Bar Rush</b> will add a shot of fun to your iPhone or iPod Touch.&#160;An immersive time-management simulation with stimulation, <b>Bar Rush</b> will challenge you across 6 action-packed levels, as you race to satisfy the thirsty throngs of fun and funky customers.&#160;Choose from 50+ ingredients to create over 80 authentic cocktails and&#160;test your speed and your skill to see if you have what it takes to become a Master Mixologist. &#160;</div>\r\n<div style="margin: 0in 0in 10pt">Can you handle the Rush?</div>', '', 1, 9, 0, 23, '2009-10-13 09:21:32', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-10-13 09:19:51', '0000-00-00 00:00:00', '', '', '', 1, 0, 65, '', '', 0, 2409, ''),
(143, 'Enter the November Bar Rush Contest and Win', '', '', '<p style="margin: 0in 0in 10pt" class="MsoNormal"><span style="font-size: larger"><font face="Trebuchet MS">Great games are only the beginning at Intersog Game Studio.<span style="mso-spacerun: yes">&#160; </span>Join our ever-growing gaming community and enter our <b style="mso-bidi-font-weight: normal">November Bar Rush High Score Contest</b> for your chance to <i style="mso-bidi-font-style: normal"><span style="color: #002060">win a free copy </span></i>of our highly anticipated game<i style="mso-bidi-font-style: normal"><span style="color: #002060">, </span><b style="mso-bidi-font-weight: normal">Hellemental</b></i>.<span style="mso-spacerun: yes">&#160; </span></font></span></p>\r\n<p style="margin: 0in 0in 10pt" class="MsoNormal"><span style="font-size: larger"><font face="Trebuchet MS">All <b style="mso-bidi-font-weight: normal">Bar Rush</b> users are eligible.<span style="mso-spacerun: yes">&#160; </span>Simply post your high tip total to the worldwide Bar Rush Leaderboard for your chance to win.<span style="mso-spacerun: yes">&#160; </span>The highest score posted in the month of November will a free promo code for Hellemental, an action-packed Tower Defense game which will soon Tower over the competition.</font></span></p>\r\n<p style="margin: 0in 0in 10pt" class="MsoNormal"><span style="font-size: larger"><font face="Trebuchet MS">Bar Rush, a featured selection on iTunes, has shaken up the iPhone with its mixture of fast-paced, realistic gameplay and cast of outrageous characters.<span style="mso-spacerun: yes">&#160; </span>Unlock your inner-bartender today and win!<span style="mso-spacerun: yes">&#160; </span><span style="mso-spacerun: yes">&#160;</span></font></span></p>\r\n<p style="margin: 0in 0in 10pt" class="MsoNormal"><span style="font-size: larger"><font face="Trebuchet MS">If you donÃ¢â‚¬â„¢t already own Bar Rush, you can find it at the iTunes App Store via the link below:</font></span></p>\r\n<p style="margin: 0in 0in 10pt" class="MsoNormal"><a href="http://itunes.apple.com/us/app/bar-rush/id333188691?mt=8"><font color="#0000ff" face="Trebuchet MS">http://itunes.apple.com/us/app/bar-rush/id333188691?mt=8</font></a><font face="Trebuchet MS"> </font></p>\r\n<p style="text-align: center; margin: 0in 0in 10pt" class="MsoNormal"><img width="100" height="100" alt="" src="http://www.intersog.com/original.png" /><br />\r\n&#160;</p>', '', 1, 9, 0, 23, '2009-11-09 11:51:49', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-11-09 11:48:31', '0000-00-00 00:00:00', '', '', '', 1, 0, 63, '', '', 0, 2021, ''),
(144, '4th Anniversary Celebration', '', '', '<div style="margin: 0in 0in 10pt">When INTERSOG first opened for business 4 years ago, some of todayÃ¢â‚¬â„¢s most popular technologies like the iPhone, Twitter and Facebook didnÃ¢â‚¬â„¢t even exist.&#160;Since then we have focused on Ã¢â‚¬Å“Riding TechnologyÃ¢â‚¬â„¢s WaveÃ¢â‚¬Â, quickly adapting to the changing marketplace and creating innovative products that take full advantage of the latest trends.</div>\r\n<div style="margin: 0in 0in 10pt">Today, we have become a leading developer of smartphone applications for every major platform including iPhone, Blackberry and Android.&#160;Our expertise in mobile application development has resulted in the #1 free Business app on AppleÃ¢â‚¬â„¢s App Store as well as Top 100 rankings in almost every major category from Games and Lifestyle to Education and Finance.&#160;As a leader in developing mobile apps for the consumer market, we are now also a Ã¢â‚¬Å“go-toÃ¢â‚¬Â resource for 3<sup>rd</sup> party companies of all sizes needing specialized application development services.</div>\r\n<div style="margin: 0in 0in 10pt">For our 4<sup>th</sup> anniversary celebration, we held a 1980Ã¢â‚¬â„¢s-themed costume party that paid tribute to our success and an era that ushered in the current technology boom.&#160;Though we think we look quite smashing in our retro-attire, INTERSOG would like to note that this in no way reflects our standard company dress code <span>J</span>.</div>\r\n<div style="margin: 0in 0in 10pt">HereÃ¢â‚¬â„¢s to another year of success for us and for you.&#160;&#160;<br />\r\n&#160;</div>\r\n<div style="text-align: center; margin: 0in 0in 10pt"><img style="width: 661px; height: 417px" alt="" src="http://www.intersog.com/Party.JPG" /></div>', '', 1, 9, 0, 23, '2009-11-16 12:11:59', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-11-16 12:04:04', '0000-00-00 00:00:00', '', '', '', 1, 0, 62, '', '', 0, 1863, ''),
(145, 'Learning To-Go Ã¢â‚¬â€œ Ã¢â‚¬Å“WhatÃ¢â‚¬â„¢s HotÃ¢â‚¬Â on iTunes', '', '', '<div style="margin: 0cm 0cm 10pt; text-align: center"><a href="http://itunes.apple.com/us/app/real-estate-financing-and-investing/id317551743?mt=8 "><img height="100" alt="LTG Real Estate Financing and Investing" width="100" align="middle" src="http://www.intersog.com/ico_ltg_real_estate.jpg" /></a>&#160;</div>\r\n<div style="margin: 0cm 0cm 10pt"><br />\r\nWhen savvy iPhone users need innovative, integrated mLearning apps to learn like a pro, they trust Learning To-Go.&#160;Now, Learning To-Go: Real Estate Financing and Investing has been selected a <b>Ã¢â‚¬Å“<span style="font-size: larger"><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewRoom?fcId=328869742&amp;genreIdString=36&amp;mediaTypeString=Mobile+Software+Applications">WhatÃ¢â‚¬â„¢s Hot</a></span>Ã¢â‚¬Â</b> app on <b>iTunes</b>.</div>\r\n<div style="margin: 0cm 0cm 10pt 36pt; text-indent: -18pt"><span>-<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Real Estate professionals, investors and home shoppers need <a href="http://itunes.apple.com/us/app/real-estate-financing-and-investing/id317551743?mt=8 "><b>LTG:</b> <b>Real Estate Financing and Investing </b></a>to maximize their potential to make <strong><i>real</i> </strong>money in real estate.</div>\r\n<div style="margin: 0cm 0cm 10pt 36pt; text-indent: -18pt"><span>-<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span><b>Learning To-Go</b> provides a <i>trusted framework</i> that provides up-to-date professional-level content at an exceptional value.</div>\r\n<div style="margin: 0cm 0cm 10pt 36pt; text-indent: -18pt"><span>-<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>&#160;<b>Learning To-Go </b>offers unmatched <i>convenience</i> for busy professionals. Learn in your spare time, at your pace.&#160;Save your progress, save&#160;your test results and track</div>\r\n<div style="margin: 0cm 0cm 10pt 36pt; text-indent: -18pt"><span>-<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span><b>Learning To-Go </b>delivers the <i>tools</i> you need to succeed, like interactive flashcards for review, helpful charts, graphs and examples, Comprehensive tests and a course glossary.</div>\r\n<div style="margin: 0cm 0cm 10pt"><a href="http://itunes.apple.com/us/artist/intersog/id301436212"><strong>Learning To-Go</strong></a>Features:</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Full-Text Course Book</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Interactive Flashcards</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Comprehensive Exams</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Save and Compare Test Results</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Bookmarks</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Glossary</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Charts, Graphs, Examples</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Explanations of Right and Wrong Answers</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt">&#160;</div>\r\n<div style="margin: 0cm 0cm 10pt 40px; text-indent: -18pt; text-align: left">&#160;&#160;&#160;&#160;&#160;&#160;&#160; Be sure to access a complete professional-level business course, <a href="http://itunes.apple.com/us/app/real-estate-financing-and-investing/id317551743?mt=8 "><strong>Real Estate Financing and Investing</strong> </a>and get instant access to the most powerful and effective Mobile Learning tool. &#160;</div>', '', 1, 9, 0, 23, '2009-11-19 02:53:48', 66, '', '2009-11-19 03:12:31', 66, 0, '0000-00-00 00:00:00', '2009-11-19 02:39:13', '0000-00-00 00:00:00', '', '', '', 6, 0, 61, '', '', 0, 2294, ''),
(146, 'Bar Unlimited: Where ThereÃ¢â‚¬â„¢s Never a Last Call', '', '', '<div style="text-align: center; margin: 0in 0in 10pt"><img width="166" height="166" alt="" src="http://www.intersog.com/bar unlimited.jpg" /></div>\r\n<div style="margin: 0in 0in 10pt">An infinite gaming experience is coming soon to AppleÃ¢â‚¬â„¢s App Store.&#160;<b>Bar Unlimited</b>, a spin-off of our iTunes featured selection Bar Rush, delivers non-stop, fast-paced game play that is guaranteed to unlock the inner bartender in everyone.&#160;&#160;With its colorful animation and dialog, realistic game play, authentic recipes and cocktail glossary, Bar Unlimited takes mobile gaming to the next level.</div>\r\n<div style="margin: 0in 0in 10pt">Intersog Game Studio is always responsive to userÃ¢â‚¬â„¢s comments and suggestionsÃ¢â‚¬â€too many games on the market offer simplistic functionality with limited replay value.&#160;So we developed Bar Unlimited to provide both a truly infinite gaming experience and a challenge to players of all levels.&#160;The fun at Bar Unlimited only stops when you say it does.&#160;Build your skills and amass tips to post to the online Leaderboard and see if you have what it takes to be the Best Virtual Bartender in the World.</div>\r\n<div style="margin: 0in 0in 10pt">Bar Unlimited comes packed with a ton of features:</div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Infinite Game Level Plus Training Mode</div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Online Searchable Leaderboard</div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>iTunes Music Library access</div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>80+ Authentic Cocktail Recipes, 50 Ingredients, 6 Glass Types</div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Realistic Actions: Shake drinks, Mix, Serve</div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>User-save</div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 10pt 0.25in"><span>Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span></span>Cocktail Glossary</div>\r\n<div style="margin: 0in 0in 10pt">Look for Bar Unlimited soon on iTunes or visit us from your iPhone or iPod Touch at <a href="http://mobile.intersog.com/"><font color="#0000ff">http://mobile.intersog.com/</font></a></div>\r\n<div style="margin: 0in 0in 10pt">Cheers.</div>', '', 1, 9, 0, 23, '2009-11-24 10:47:53', 69, '', '2009-11-24 11:47:24', 69, 0, '0000-00-00 00:00:00', '2009-11-24 10:46:01', '0000-00-00 00:00:00', '', '', '', 2, 0, 60, '', '', 0, 1963, ''),
(147, 'New & Noteworthy on the iTunes App Store Ã¢â‚¬â€œAgain!', '', '', '<div style="margin: 0in 0in 10pt"><span style="font-size: small"><span style="font-family: Arial">Joining the growing list of INTERSOG apps which have been recognized by Apple for their excellence, the <b>Dictionary of Sales and Marketing Terms </b>has become a Ã¢â‚¬Å“<b>New and NoteworthyÃ¢â‚¬Â </b>selection on the iTunes App Store.<br />\r\n</span></span></div>\r\n<div style="text-align: center; margin: 0in 0in 10pt"><span style="font-size: small"><span style="font-family: Arial"><img width="125" height="125" alt="" src="http://www.intersog.com/dictionary.jpg" /></span></span></div>\r\n<div style="margin: 0in 0in 10pt"><span style="font-size: small"><span style="font-family: Arial">Each of INTERSOGÃ¢â‚¬â„¢s topical business dictionaries and glossaries allow professionals and students to <i>be in the know wherever they go</i>.&#160;With their combination of authoritative content and versatile features that go far beyond traditional dictionaries, each of our comprehensive dictionaries give users the flexibility they need and the reliability they expect. &#160;</span></span></div>\r\n<div style="margin: 0in 0in 10pt"><span style="font-size: small"><span style="font-family: Arial">Dictionary Features: </span></span></div>\r\n<div style="line-height: normal; text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span style="font-size: small"><span style="font-family: Arial">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>Over 1700 Sales and Marketing terms</span></span></div>\r\n<div style="line-height: normal; text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span style="font-size: small"><span style="font-family: Arial">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>Fully Browseable and Searchable</span></span></div>\r\n<div style="line-height: normal; text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span style="font-size: small"><span style="font-family: Arial">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>1-Letter Search Function</span></span></div>\r\n<div style="line-height: normal; text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span style="font-size: small"><span style="font-family: Arial">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>Regular Updates</span></span></div>\r\n<div style="line-height: normal; text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span style="font-size: small"><span style="font-family: Arial">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>Saved Search History</span></span></div>\r\n<div style="line-height: normal; text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span style="font-size: small"><span style="font-family: Arial">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>Ã¢â‚¬Å“Send to a FriendÃ¢â‚¬Â email option </span></span></div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.25in"><span style="font-size: small"><span style="font-family: Arial">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>No Internet Connection Required&#160;</span></span></div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: small"><span style="font-family: Arial">&#160;</span></span></div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: small"><span style="font-family: Arial">You can find the Dictionary of Sales and Marketing Terms and all of our exceptional mLearning products on the iTunes App Store.</span></span></div>\r\n<div style="margin: 0in 0in 0pt">&#160;</div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: 11pt"><a href="http://itunes.apple.com/us/app/dictionary-sales-marketing-terms/id338833849?mt=8"><font color="#0000ff">http://itunes.apple.com/us/app/dictionary-sales-marketing-terms/id338833849?mt=8</font></a> </span></div>', '', 1, 9, 0, 23, '2009-12-09 10:26:56', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-12-09 10:22:41', '0000-00-00 00:00:00', '', '', '', 1, 0, 59, '', '', 0, 2017, ''),
(148, 'Play and Win with INTERSOG', '', '', '<div style="text-align: center; margin: 0in 0in 10pt">Buy <b><span style="color: #002060">Bar Rush Unlimited</span></b> through January, 31 2010 and become automatically entered to <span style="color: #002060">WIN a FREE iPod Touch</span> courtesy of INTERSOG Game Studio.</div>\r\n<div style="margin: 0in 0in 10pt">Bar Rush Unlimited is currently a TOP TEN Role Playing game on the iTunes App Store.&#160;Now, you can get in on the fun and excitement and win just for playing the game everyone is talking about.&#160;</div>\r\n<div style="margin: 0in 0in 10pt">Mix, shake and pour your way to Mixologist mastery, post your tips to the worldwide Leaderboard and when youÃ¢â‚¬â„¢re through, use the handy cocktail glossary to whip up your favorite drink.&#160;Cheers and good luck!</div>\r\n<div style="text-align: center; margin: 0in 0in 10pt"><img width="166" height="166" alt="" src="http://www.intersog.com/bar%20unlimited.jpg" /></div>\r\n<div style="margin: 0in 0in 10pt">iTunes link: <a href="http://itunes.apple.com/us/app/bar-rush-unlimited/id342474523?mt=8"><font color="#0000ff">http://itunes.apple.com/us/app/bar-rush-unlimited/id342474523?mt=8</font></a></div>', '', 1, 9, 0, 23, '2009-12-14 11:40:13', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2009-12-14 11:35:52', '0000-00-00 00:00:00', '', '', '', 1, 0, 58, '', '', 0, 1707, ''),
(150, 'Focus on Android''s Camera Functionality', '', '', '<div style="text-align: left; margin: 0in 0in 10pt"><strong>Android''s </strong>camera functionality needs major improvements if it hopes to catch up with the <strong>iPhone</strong>.Ã‚Â </div>\r\n<div style="margin: 0in 0in 10pt">Ã‚Â </div>\r\n<div style="text-align: center; margin: 0in 0in 10pt"><img alt="As good as it gets with the Android Camera" width="280" height="210" src="http://www.intersog.com/android_pic1.jpg" /></div>\r\n<div style="margin: 0in 0in 10pt">Perhaps more a hardware problem than an OS issue, every model of Android phone we''ve seen seems to be lacking in the camera department.Ã‚Â Even under the assumption that the Android is geared toward business users while the iPhone is geared toward the commercial market, business professionals have a need for a reasonably useable camera.Ã‚Â Whether its photographing business cards, a key slide from a presentation or taking photos to add to a contact list, there are numerous business uses for a quality in-phone camera.</div>\r\n<div style="margin: 0in 0in 10pt">Android''s camera functionality seems to be lacking in every area and this has nothing to do with megapixels.Ã‚Â Image stabilization with the Android is virtually non-existent, making every picture an exercise in holding perfectly still while shooting.Ã‚Â And even when stabilization isn''t an issue, the grainy photographs that result leave them with severely limited usability.</div>\r\n<div style="margin: 0in 0in 10pt">So Android, we''re not asking for a professional quality digital camera built into our smartphones, we simply want the ability to take a quick photo that we can send to friends or colleagues without having them reply: Ã¢â‚¬Å“what was that picture of?Ã¢â‚¬Â</div>\r\n<div style="text-align: center; margin: 0in 0in 10pt"><img alt="" width="320" height="240" src="http://www.intersog.com/android_pic2.jpg" /></div>\r\n<div style="text-align: center; margin: 0in 0in 10pt">Ã‚Â </div>', '', 1, 9, 0, 23, '2010-01-19 10:30:30', 69, '', '2010-01-20 03:54:33', 115, 0, '0000-00-00 00:00:00', '2010-01-19 10:20:10', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 11, 0, 57, '', '', 0, 1601, ''),
(151, 'Test', '', 'test', 'blah....blah', '', -2, 9, 0, 23, '2010-01-19 10:42:46', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2010-01-19 10:41:36', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 1, 0, 15, '', '', 0, 0, ''),
(152, 'Reflections on Employee Motivation', '', '', '<div style="margin: 0in 0in 10pt">Giving each employee positive feedback is very important.&#160;A good manager always knows when and how to praise their staff.&#160;It is important to give feedback that is as specific as possible.</div>\r\n<div style="margin: 0in 0in 10pt">I always look to give praise to our developers in the following areas:</div>\r\n<ul>\r\n    <li>Quality work</li>\r\n    <li>Efficiency</li>\r\n    <li>Correct and accurate understanding of complex requirements</li>\r\n    <li>Interesting ideas or solutions to problems</li>\r\n    <li>Use of unique approaches, which improved the quality of development or shortened the duration of the project</li>\r\n    <li>Praise is the easiest and most cost-effective form of motivation.&#160;Giving praise in the presence of other colleagues is ideal, as it spurs other team members to raise their performance level and do a better job.</li>\r\n</ul>\r\n<div style="margin: 0in 0in 10pt">Positive feedback from a client is especially nice, which is our goal on every project.&#160;Customer praise is an excellent indicator of quality work and the teamÃ¢â‚¬â„¢s overall success.&#160;One simple sentence: Ã¢â‚¬ËœFantastic. &#160;This is really great and fun.Ã¢â‚¬â„¢ from Bill Helman, one of our clients, creates miracles within the team <img alt="" src="/mambots/editors/fckeditor/editor/images/smiley/msn/regular_smile.gif" /></div>\r\n<div style="margin: 0in 0in 10pt">To be continued&#160;...."</div>\r\n<div style="margin: 0in 0in 10pt">Julia Zagoruiko</div>\r\n<div style="margin: 0in 0in 10pt">Director of Mobile Development</div>', '', 1, 9, 0, 23, '2010-01-20 12:43:21', 69, '', '2010-01-20 12:43:32', 69, 0, '0000-00-00 00:00:00', '2010-01-20 12:40:07', '0000-00-00 00:00:00', '', '', '', 2, 0, 56, '', '', 0, 1468, ''),
(153, 'Android Provides Innovative Ways to Promote Your Business.', '', '', '<div style="margin: 0in 0in 10pt"><span style="font-size: small"><span>AndroidÃ¢â‚¬â„¢s free-app model creates an innovative channel for small/mid-size companies and eliminates the need for separate mobile websites.</span></span></div>\r\n<div style="text-align: center"><span style="font-size: small"><span><img alt="" width="100" height="166" src="http://www.intersog.com/Nexus One.jpg" /></span></span></div>\r\n<span style="font-size: small"><span><br />\r\n</span></span>\r\n<div style="margin: 0in 0in 10pt"><span style="font-size: small"><span>Mobile apps have become the equivalent of websites and free apps on the App Store and Android Market have created an innovative channel to promote businesses.</span></span></div>\r\n<div style="margin: 0in 0in 10pt"><span style="font-size: small"><span>I believe that in 1-2 years, essentially every small and mid-sized business will have their own applications on one or more mobile markets.</span></span></div>\r\n<div style="margin: 0in 0in 10pt"><span style="font-size: small"><span>Certainly, Android is going to drive this business because Android users have gotten used to the free app model.&#160;This makes for a good platform to promote any type of business, product or service. With AndroidÃ¢â‚¬â„¢s focus seemingly on the business user, this could prove to be an effective channel for B2B promotions and client services.<br />\r\n<br />\r\nJulia Guzunova<br />\r\nMarketing Director</span></span></div>\r\n<span style="font-size: small"><br />\r\n</span>', '', 1, 9, 0, 23, '2010-01-21 10:24:06', 69, 'Julia Guzunova', '2010-01-29 02:29:16', 115, 0, '0000-00-00 00:00:00', '2010-01-21 10:11:58', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 4, 0, 55, '', '', 0, 1770, ''),
(154, 'Intersog Game Studio is now Dirty Edge.com', '', '', '<div style="margin: 0in 0in 10pt"><span style="font-size: small">Yesterday INTERSOG acquired the new domain name <strong>dirtyedge.com</strong>.&#160;Perhaps you are wondering what a mobile software development company is going to use this domain for?&#160;Well, if youÃ¢â‚¬â„¢re familiar with INTERSOG, youÃ¢â‚¬â„¢ll know that we are a maker of cutting-edge, genre-bending mobile games like myPoker, Bar Rush and Bar Rush Unlimited for the iPhone and iPod Touch.&#160;Dirty Edge will give our game studio a unique identity in the marketplace.&#160;</span></div>\r\n<div style="margin: 0in 0in 10pt"><span style="font-size: small">Our brand new 3D title, Hellemental will be published on the App Store next week, but this is only the beginning.&#160;Many more new games are coming soon to a small screen near you.&#160;Game on.&#160;&#160;&#160; <br />\r\n<br />\r\nBar Rush Unlimited: <a href="http://itunes.apple.com/us/app/bar-rush-unlimited/id342474523?mt=8">http://itunes.apple.com/us/app/bar-rush-unlimited/id342474523?mt=8</a><br />\r\n<br />\r\nBar Rush: <a href="http://itunes.apple.com/us/app/bar-rush/id333188691?mt=8">http://itunes.apple.com/us/app/bar-rush/id333188691?mt=8</a><br />\r\n<br />\r\nmyPoker: <a href="http://itunes.apple.com/us/app/mypoker/id316733093?mt=8">http://itunes.apple.com/us/app/mypoker/id316733093?mt=8</a><br />\r\n<br />\r\nHellemental:&#160; <a href="http://www.dirtyedge.com/hellemental">www.dirtyedge.com/hellemental</a><br />\r\n<br />\r\nVadim Chernega<br />\r\nCEO INTERSOG/Dirty Edge</span></div>', '', 1, 9, 0, 23, '2010-01-25 12:23:54', 69, 'Vadim Chernega', '2010-01-29 02:28:34', 115, 0, '0000-00-00 00:00:00', '2010-01-25 12:16:19', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 7, 0, 54, '', '', 0, 1681, ''),
(155, 'Apple Tablet: What? Why Now? How Much?', '', '', '<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">Thoughts on tomorrow''s Apple announcement:</span><b><span style="color: black; font-size: 10pt"><br />\r\n<br />\r\nWhat</span></b></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">In this day and age we keep our mobile phones close to us all the time. There are very few things you do in your life when you don''t have your phone right next to you, I won''t mention these situations here ;-)&#160;</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">Now let''s say you like to travel a lot and you have kids (yes I''m talking about myself ;-), suddenly you need your phone to do a hell of a lot more than just making calls. For some time I thought that the iPhone or iPod Touch + a good old phone from the pre-iPhone era could be that thing, which allows you to be &#160;connected with the your friends and family, watch movies and photos, listen music and of course have a game console with you.&#160;</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">But what if occasionally you need to be able to write emails to the folks in your office, which just can''t wait till you get back next week, or some inspiration hits you and you need to capture the ideas before they just fade away? A MacBook Air? Well, maybe, but $1,499 isn''t something that necessary fits into your budget. Next guess? &#160;A netbook? Close. Actually, the Apple Tablet to be precise.</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><b><span style="color: black; font-size: 10pt">Why now</span></b></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">Netbooks have been booming for the last couple years but Apple hasn''t released their own version yet. Well, tomorrow we''ll see what they have to say. I believe the reason Apple has postponed their answer on the whole netbook thing is rather simple. Apple doesn''t develop a product only when they can technically do it, but only when they have a reasonable price for it as well. I guess this is the time.</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><b><span style="color: black; font-size: 10pt">How much</span></b></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">Ladies &amp; Gentlemen, take your best guess! I hope the price is going be somewhere between $600 and $800. And please, no required contracts with AT &amp; T / Verizon / Horizon / or whoever to provide 3G connectivity. Otherwise it will be the same old story as the iPhone - jailbreak.</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">PS. If you really can''t wait till tomorrow after waiting for the last several years, here is a parade of mock-ups people have come up with so far for the Apple Tablet -&#160;</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 4.5pt"><span style="color: black; font-size: 10pt"><a target="_blank" href="http://www.ismashphone.com/2010/01/15-apple-tablet-mock-ups-close-but-no-cigar.html"><span style="color: #4263ab">http://www.ismashphone.com/2010/01/15-apple-tablet-mock-ups-close-but-no-cigar.html</span></a></span></div>\r\n<div style="margin: 0in 0in 10pt">&#160;</div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">Artyom Diogtev,</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 0pt"><span style="color: black; font-size: 10pt">Internet Marketing Manager</span></div>\r\n<div style="line-height: normal; margin: 0in 0in 4.5pt"><span style="color: black; font-size: 10pt">Marketing Department</span></div>', '', 1, 9, 0, 23, '2010-01-26 10:07:26', 69, 'Artyom Diogtev', '2010-01-29 02:26:25', 115, 0, '0000-00-00 00:00:00', '2010-01-26 10:02:28', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 5, 0, 53, '', '', 0, 1560, ''),
(156, 'Thoughts on Job Postings', '', '', '<div style="margin: 0in 0in 10pt">We currently have two open positions, PHP guru and Java guru.</div>\r\n<div style="margin: 0in 0in 10pt">One is opened for more than a month and there has not been much interest.</div>\r\n<div style="margin: 0in 0in 10pt">The Java guru position received some attention, but not from job sites where the position was posted.</div>\r\n<div style="margin: 0in 0in 10pt">So, the bottom line is: posting on job sites gives a little return in attracting talented developers.</div>\r\n<div style="margin: 0in 0in 10pt">Personal friends and acquaintances are a much better way to find someone capable.</div>\r\n<br />\r\nSergey Rogachov<br />\r\nCTO, INTERSOG', '', 1, 9, 0, 23, '2010-01-27 11:27:10', 69, 'Sergey Rogachov', '2010-01-29 02:27:13', 115, 0, '0000-00-00 00:00:00', '2010-01-27 11:23:13', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 4, 0, 52, '', '', 0, 1489, '');
INSERT INTO `jos_content` (`id`, `title`, `alias`, `title_alias`, `introtext`, `fulltext`, `state`, `sectionid`, `mask`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `publish_up`, `publish_down`, `images`, `urls`, `attribs`, `version`, `parentid`, `ordering`, `metakey`, `metadesc`, `access`, `hits`, `metadata`) VALUES
(157, 'iPhone OS 3.2 Beta, a Sneak Peak ', '', '', '<div style="margin: 0in 0in 10pt"><span style="font-size: small">Apple recently released a beta version of their new Software Development Kit (SDK) 3.2, which will provide support for the recently announced and much anticipated iPad device, as well as the iPhone and iPod Touch.&#160;INTERSOGÃ¢â‚¬â„¢s technology team is already busy analyzing the documentation and testing the new SDK.&#160;We will report back shortly on our experience in using what promises to be a revolutionary new set of tools for developers.&#160;While some of the features are subject to change as future beta versions are released, here are some highlights from our initial look at this new OS.</span></div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.5in"><span style="font-size: small">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>SDK 3.2 will provide a range of tools for creating apps for both the iPhone OS and Mac OS X.</span></div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.5in"><span style="font-size: small">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>The software will allow for the simultaneous creation of apps for the iPhone, iPod Touch and new iPad.</span></div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.5in"><span style="font-size: small">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>The included Xcode software has features that allow for existing apps to be easily converted to run on the iPad.</span></div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 0pt 0.5in"><span style="font-size: small">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>Xcode will allow for easier debugging of signed apps, hopefully simplifying the validation and submission process. </span></div>\r\n<div style="text-indent: -0.25in; margin: 0in 0in 10pt 0.5in"><span style="font-size: small">Ã‚Â·<span style="font: 7pt ''Times New Roman''">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </span>The included Interface Builder supports settings controlling the way apps are displayed on the iPad platform.</span></div>\r\n<div style="margin: 0in 0in 10pt"><span style="font-size: small">These are just a few of the many notable features included in OS 3.2 beta.&#160;As the software reaches its final release stage prior to the launch of the iPad, stay tuned to INTERSOG, the leader in mobile application development.</span></div>', '', 1, 9, 0, 23, '2010-01-28 13:21:47', 69, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2010-01-28 13:17:20', '0000-00-00 00:00:00', '', '', '', 1, 0, 51, '', '', 0, 1553, ''),
(158, 'iPhone 3GS User Experience', '', '', 'It''s a been a week since I started to use the iPhone 3GS.<br />\r\nThe first thing that struck me about this device was its speed and the apps were really stable. It really works 2 times faster than the previous model. I used to have problems launching some of our and other developers apps but not with this device. <br /> <br />\r\n \r\nI have to mention such additional advantages of this new model such as video recording, auto-focus, built-in compass plus a faster and more stable GPRS connection. <br /> <br />\r\n \r\nThe best part for me was that data transfer from my old phone took about 2 hrs and all I needed to do was to press a button couple times. During the transfer process all my apps and even my alarm settings were successfully transferred. The only thing, which I had to reset manually was the WiFi connection and individual ring tone settings. <br /> <br />\r\n \r\niPhone today and especially iPhone 3GS is a powerful tool for consumers and business. It''s a gorgeous portable game platform and a fantastic audio and video player. Of course it has its drawbacks, but they are hardly noticeable compared with its advantages. The Apple magic keeps working. <br /> <br />\r\n\r\nJulia Zagoruiko <br />\r\nDirector of Mobile Development', '', 1, 9, 0, 23, '2010-01-29 02:15:46', 115, 'Julia Zagoruiko', '2010-02-01 09:17:43', 115, 0, '0000-00-00 00:00:00', '2010-01-29 02:11:54', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 10, 0, 50, '', '', 0, 1488, ''),
(159, 'The brand new title ''Hellemental''', '', '', 'Today has been a real milestone for us with both our new studio brand going public <a href="http://dirtyedge.com" target="_blank"> DirtyEdge.com</a> and our new title ''Hellemental'' going GOLD. Final production was completed at 18:00 only one hour behind schedule and is now hurtling its way to the AppStore. Keep your eyes pealed for news and information about our studio, the development team and our new products that we will be announcing over the next few days and weeks, there are a lot of exciting things happening that I am really looking forward to sharing with you all.<br /><br />\r\n\r\nLuke Stafford:<br />\r\n<a href="http://dirtyedge.com" target="_blank"> DirtyEdge.com</a> Game Studio Producer', '', 1, 9, 0, 23, '2010-01-29 14:26:50', 115, 'Luke Stafford', '2010-01-29 15:17:44', 115, 0, '0000-00-00 00:00:00', '2010-01-29 14:24:12', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 10, 0, 49, '', '', 0, 1529, ''),
(160, 'ComboApp: The Future of App-Building', '', '', '<div style="margin: 0in 0in 0pt"><span style="font-size: small"><a href="http://www.intersog.com/images/iphone-ipad-android.jpg" target="_blank"><img alt="Click to open a full size image" width="194" height="291" src="http://www.intersog.com/images/iphone-ipad-android_small.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-right: 0em;"></a>\r\nThe ComboApp team has reported today the status of the production timeline. It looks like we are going to hit the AppStore and Android markets sometime after the 12th of February. &#160;I was also pleasantly surprised today when the design team presented a new splash screen for the main app featuring an iPhone as a girl in a T-Shirt and an Android phone in Hawaii trunks! :-)\r\n</span>\r\n</div>\r\n<div style="text-align: center; margin: 0in 0in 0pt"></div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: small">&#160;</span></div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: small">ComboApp is the next revolutionary method to build smartphone apps, and the best part is that we will offer the base service for <strong>free</strong>.&#160; ComboApp is designed with dozens of business-specific modules that make it easy for stores, restaurants, bars, real estate companies, radio stations and many other businesses to build customized apps perfectly suited for their industry.&#160; In addition to the free ComboApp package, there will also be a number of paid app-building packages that provide cost-effective solutions for businesses that want to take their iPhone or Android apps to the next level.<br />\r\n<br />\r\nA demo version of ComboApp will be released later this week.</span></div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: small">&#160;</span></div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: small">Vadim Chernega</span></div>\r\n<div style="margin: 0in 0in 0pt"><span style="font-size: small">INTERSOG CEO</span></div>', '', 1, 9, 0, 23, '2010-02-01 09:48:10', 69, 'Vadim Chernega', '2010-02-04 16:05:09', 115, 0, '0000-00-00 00:00:00', '2010-02-01 09:46:55', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 42, 0, 48, '', '', 0, 1704, ''),
(161, 'Battery Life', '', '', '<img alt="empty iPhone battery" width="184" height="172" src="http://www.intersog.com/images/iphone-battery-icon-small.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-right: 0em;">\r\nLooking around these days every business professional has a blackberry, iphone, windows mobile, palm or android. All the devices are common in core functionality, all provide email and calendar \r\nsynchronization however it seems that with progression of technology and color screens on all recent gadgets the most underdeveloped and overlooked feature among all of them is battery life!<br /> <br />\r\n\r\nBack in 2004 I remember my blackberry that used monochrome screen similar to Amazon Kindle and used to last the whole week on a single charge doing all of the email chores and calendar and I didn''t even think for to carry a charger with me when going on a business trips for a couple of days. Now its a totally different story, iphone and android users can attest that even though their devices are superior in functionality to my old school blackberry none of them can match the battery life my blackberry had. <br /> <br /> \r\n\r\nI guess in a run for the best in feature set manufacturers struggle to emphasize how important it is to have a charger with you at all times. Who cares if I can standby with my phone for 200 hours? Or talk straight for 6 hours before depleting the battery? I want to actually use it, use apps on my android, listen to Pandora on the go, use Google Maps, use camera and email as much as I can. The reality is though is unless you carry charger in 14 hours of normal "old blackberry like" use patterns you are carrying a very expensive brick with dead battery, regardless of who made it Apple or HTC. <br /> <br />\r\n\r\nSo buying a new phone implies that you are somehow aware that charger in your pocket is as essential as gas in your guz guzzling car. That''s it, there should be new attribute attached to the new pda devices, the power guzzler! And don''t get me wrong, my droid phone can do lots of things that the blackberry couldn''t, but at the end of the day if you don''t have a power outlet next to you by the dusk, you are out of voice and email  by dawn! so please, all of you Sony, HTC, Motorola and Apples of the world come up with a better battery technology to keep us email junkies fueled with things to do! <br /> <br />\r\n\r\nBAXTEP', '', 1, 9, 0, 23, '2010-02-02 08:06:28', 116, '', '2010-02-09 08:27:33', 115, 0, '0000-00-00 00:00:00', '2010-02-02 08:05:00', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 12, 0, 47, '', '', 0, 1572, ''),
(162, 'Flash on Mac OSX ', '', '', 'I think it''s&#160;pretty fair to say that there is no single person on the planet who uses the Internet and hasn''t watched a YouTube video yet. I don''t think such a person exists.&#160;Essentially the only technology which allows you, or should I say allowed you, to watch these videos is Adobe Flash. There are tons of other sites, which use Flash to present some content-with ads included. I think when you are being exposed that much to the Flash and if you read some of the public statements from Adobe itself you may become a firm believer in the notion that the Internet can''t exist without this technology at all.<br /><br />\r\nI guess at this point you are wondering what this has in common with the post title? The thing is that when I switched from PC to Mac 2.5 years ago one of the things I realized from the very beginning was how many of my MacBook''s resources had been consuming to display Flash content and of course YouTube was the major culprit.<br /><br />\r\n\r\nA few weeks ago Google launched an alternative way to watch YouTube videos using HTML5 and basically you don''t need Flash to watch your favorite videos on YouTube anymore. Now, when I watch a video on YouTube using the ''watch via HTML5'' function, I don''t hear my MacBook fan going crazy anymore and it means A LOT. It means much less energy and battery consumption, which means more time on a single charge and of course less heat from my adorable MacBook :-)<br /><br />\r\n\r\nA recent post on Wired.com shades some light on the whole issue with Adobe <a style="color: rgb(85,26,139)" id="yo0y" title="Wired.com Article" href="http://www.wired.com/epicenter/2010/01/googles-dont-be-evil-mantra-is-bullshit-adobe-is-lazy-apples-steve-jobs/" rel="nofollow"><span style="font-size: small"><font class="Apple-style-span">link here</font></span></a> I can only subscribe to Steve Job''s statement about Adobe''s laziness at writing efficient code for the Flash Player on Mac OSX.<br /><br />\r\nThere is a future for the Internet WITHOUT Flash. Period.<br />\r\n<br />\r\n___<br />\r\nArtyom Dogtiev<br />\r\nIntesog Internet Marketing Manager<br />\r\n', '', 1, 9, 0, 23, '2010-02-03 12:29:05', 69, 'Artyom Dogtiev', '2010-02-15 09:28:38', 115, 0, '0000-00-00 00:00:00', '2010-02-03 12:23:48', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 15, 0, 46, '', '', 0, 1541, ''),
(164, 'Thoughts on "Apple Surveying iPhone Developers" article', '', '', 'I was going to write about a&#160;different topic today, but reading through my long accumulated blog articles "of interest", (i.e. articles that I mark with a star in hope to read them one day) I decided to comment on the "Apple Surveying iPhone DevelopersÃ¢â‚¬â„¢ Happiness With The App Store" at http://techcrunch.com/2010/02/08/apple-app-store-survey/ This is a touchy subject for a CEO of a company that maintains more than a 100 of its own products on different mobile markets, with a majority on the App Store. And it''s an especially touchy subject because we are currently recovering from the painful process of going to market with a new game, Hellemental. Well, honestly, Apple has improved their AppStore approval process a lot after they took their system offline during Christmas period, however the AppStore itself and its servers are still a pain in the a** for publishers to work with. <br />\r\n<br />\r\nTo keep the story short, after Hellemental was approved (yea, it took only 4 days!), it was stuck with the rest of the approved apps in one of Apple''s "statistics-delayed-please-wait" situations, when most of Apple''s servers were agonizingly not updated in time. When they finally managed to break through the traffic jam, they published several hundred apps to the market in one batch. A similar story happened to Intersog''s previous game, Bar Rush in September of last year. But again, this is a very typical situation, and happens a lot to the AppStore and iTunes Connect. <br />\r\n<br />\r\nNow what that means to a publisher in terms of visibility? To better understand this, please answer the question - how much traffic does your website get when you are on the first page of the Google''s search results? And now, how much traffic do you get when your website is on 5th or 6th page? Well, the same story applies to AppStore. When you release a new product, you want to be on the first page sorted by Release Date, not on 3rd or 4th (and there are 25 apps on one page), and especially not when the results are sorted alphabetically! There is no explanation about this reoccurring situation, which happened this time in early February. That''s just very lousy work by Apple''s devs and managers. So my opinion on this - Apple ignored, ignores and will ignore us devs and publishers. Up until most of us leave for the Android Market or to RIM''s, Microsoft''s or Symbian''s markets. And hell, we do not care - we will move. Our primary goal is servicing our customers and if customers decide to use Android, then let it be so, Apple :-) Up until then, I am Ã¢â‚¬Å“Very dissatisfied". <br />\r\n<br />\r\nVadim Chernega<br />\r\nINTERSOG CEO', '', 1, 9, 0, 23, '2010-02-09 11:32:31', 69, 'Vadim Chernega', '2010-02-09 14:25:48', 115, 0, '0000-00-00 00:00:00', '2010-02-09 11:30:31', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 5, 0, 44, '', '', 0, 1454, ''),
(163, 'iPhone OS 3.1.3', '', '', '<img alt="iPhone OS 3.1.3" width="150" height="104" src="http://www.intersog.com/images/iphone-3-1-3-update.jpg" / style="forpost: right; float: right; margin-bottom: 0em; margin-left: 0em;">\r\nA new version of iPhone OS 3.1.3 is available for download from iTunes (plug your iPhone into your Mac/PC and check the iPhone Summary pane to update your device). It has &#160;some minor enhancements, as well as fixes for some bugs and vulnerabilities.<br /><br />\r\n\r\nThe major changes are:\r\n<ul style="margin-top: 0px; margin-bottom: 0px">\r\n    <li style="margin-top: 0px; margin-bottom: 0px"><span style="color: #000000"><font class="Apple-style-span">The updated platform is capable of determining an iPhone 3GS'' battery charge level more accurately</font></span></li>\r\n    <li style="margin-top: 0px; margin-bottom: 0px"><span style="color: #000000"><font class="Apple-style-span">Third-party application launch failures have been fixed</font></span></li>\r\n    <li style="margin-top: 0px; margin-bottom: 0px"><span style="color: #000000"><font class="Apple-style-span">Support issues with the Japanese keyboard (Kana) have been fixed. Those issues could randomly cause OS crashes.</font></span></li>\r\n</ul>\r\n<br /><br />\r\nJulia Zagoruiko,<br />\r\nDirector of Mobile Development', '', 1, 9, 0, 23, '2010-02-04 09:43:05', 69, 'Julia Zagoruiko', '2010-02-04 15:56:59', 115, 0, '0000-00-00 00:00:00', '2010-02-04 09:41:14', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 15, 0, 45, '', '', 0, 1504, ''),
(165, 'Carputer', '', '', 'Just had a thought this morning on the plane: how odd it is that most of the big automakers think more about the bottom line instead of generation Y''s current needs. Of course, its evident that most of baby boomers these days are the consumers of the Camrys and Accords of the world, but what about the younger generation? Why there is no car that instead of heated seats or leather interior comes with a built-in wifi router that''s connects to 3g/4g or better yet with a built-in computer and keyboard?&#160;<br />\r\n<br />\r\nThe days of people commuting alone are long gone. If I''m driving, I want my passengers to be able to check their Facebook pages or post blogs or even better - host live video of a road trip, regardless of whether that''s the commute to the office or a trip to Las Vegas. &#160;How many times have I realized that my car''s satellite radio is unfortunately a one way communication device? &#160;How many times have I seen fan posts about installing a computer into their car - carputer? Change are needed in auto department. Come on, this is 2010. We are not craving small block engines or a carburetor vs. fuel injector engines anymore, we are after fully internet connected automobiles! Get me a Ford Flex that has built in wifi and I will be the first to buy it!<br /><br />\r\nBAXTEP', '', 1, 9, 0, 23, '2010-02-10 08:07:38', 69, 'BAXTEP', '2010-02-10 11:11:32', 115, 0, '0000-00-00 00:00:00', '2010-02-10 08:05:40', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 6, 0, 43, 'Cars, Automobiles, Computers', '', 0, 1375, ''),
(166, 'Opera Is The Browser to Sample Music ', '', '', 'Okay, I found it pretty easy to combine Google, MySpace and the web browser Opera into a machine to try out a new Rock Band.<br />\r\n<br />\r\nOpera has the customizable search feature.<br />\r\n<br />\r\nGoogle has a nice search and a brilliant "feeling lucky" feature.<br />\r\n<br />\r\nMySpace has a nice feature for playing sample songs of if you are on the musicianÃ¢â‚¬â„¢s page.<br />\r\n<br />\r\nSo let''s try to do it with bare hands first.<br />\r\n<br />\r\nLet''s craft an URL to show a MySpace page of the great Finnish Melodic Death Metal band Insomnium.<br />\r\n<br />\r\n<a href="http://www.google.com/search?q=myspace+Insomnium" target="_blank">http://www.google.com/search?q=myspace+Insomnium</a>\r\n<br />\r\nAha, found one. But to directly navigate to that page we need to use the "feeling lucky" feature .<br />\r\n<br />\r\nNo problems. Let''s add a new variable to the URL.<br />\r\n\r\n<a target="_blank" href="http://www.google.com/search?q=myspace+Insomnium&amp;btnI=1">http://www.google.com/search?q=myspace+Insomnium&amp;btnI=1</a><br />\r\n<br />\r\nIt works. &#160;We go straight to the page and can listen to the music without pressing a key.<br />\r\n<br />\r\nNow, let''s integrate the search into Opera.<br />\r\n- Go to menu tools/preferences/search tab&#160;<br />\r\n- Press "add" <br />\r\n- Specify:<br />\r\nName : myspace<br />\r\nKeyword : m<br />\r\nAddress :&#160;<a target="_blank" href="http://www.google.com/search?btnI=1&amp;q=myspace+%25s">http://www.google.com/search?q=myspace+%s</a><br />\r\n<br />\r\nItÃ¢â‚¬â„¢s done.<br />\r\n<br />\r\nNow you can type in OperaÃ¢â‚¬â„¢s address field: m Insomnium and go directly to the page .<br />\r\nNote that I believe similar results can be achieved with FireFox, but I really do not know.<br/><br />\r\nSergey Rogachov,<br />\r\nINTERSOG, CTO<br />\r\n', '', 1, 9, 0, 23, '2010-02-10 10:19:39', 69, 'Sergey Rogachov', '2010-02-10 11:23:29', 115, 0, '0000-00-00 00:00:00', '2010-02-10 10:13:12', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 17, 0, 42, '', '', 0, 1471, ''),
(168, 'The Olympic Flame', '', '', '<a href="http://twitpic.com/12lsro/full" target="_blank">\r\n<img alt="Vancouver Olympic Flame" width="240" height="180" src="http://www.intersog.com/images/olypmic_flame1_sm.jpg" style="forpost: right; float: left; margin-bottom: 0em; margin-right: 1em;"></a>\r\nIt''s early morning in Vancouver, 6am, dark and rainy outside. I wake my daughter up, we planned to go to the street to see magic happen - the Olympic torch relay. the Flame is scheduled to be carried right in front of our house! We go outside and spend 20 minutes waiting, mixed in a diverse, multicultural crowd, most people dressed in red colors, waving Canadian flags and cheering. Coca Cola is making things brighter, their truck passes by, with music and dancers, and everybody is given a small colorful bottle of Cola.<br /><br/>\r\n<a href="http://twitpic.com/12lsv6/full" target="_blank">\r\n<img alt="Vancouver Olympic Flame" width="240" height="180" src="http://www.intersog.com/images/olypmic_flame2_sm.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-right: 0em;"></a>\r\n 5 minutes later Caroline gets a small flag from neighbors and a cookie from the nice folks at the local grocery store.  Finally, loud cheers begin rising and the torch bearer appears - a man is running, dressed all in white, with a white torch. The warmth is felt not only from the flame but also from the understanding that this is a historic moment watching the Olympic torch which tomorrow will be used to light up the main flame at the Olympic stadium! \r\n<br/><br/>\r\nVadim Chernega,<br/>\r\nINTERSOG CEO', '', 1, 9, 0, 23, '2010-02-11 10:47:24', 115, 'Vadim Chernega', '2010-02-11 10:55:48', 115, 0, '0000-00-00 00:00:00', '2010-02-11 10:35:59', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 7, 0, 40, '', '', 0, 1510, ''),
(167, 'Watching 2010 Winter Olympics on the iPhone', '', '', '<a href="http://www.intersog.com/images/olympic1_b.jpg" target="_blank"><img alt="empty iPhone battery" width="133" height="200" src="http://www.intersog.com/images/olypmic1.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 0em;"></a>\r\nThere are only 2 days left until the 2010 Winter Olympics begin in Vancouver. There is a new app for all sport fans to help follow the games. Winter 2010 from Toughturtle will help you to stay in touch with all the Olympic sporting events. Winter 2010 app will provides continually updated information about the games.<br />\r\n<a href="http://www.intersog.com/images/olympic2_b.jpg" target="_blank"><img alt="empty iPhone battery" width="133" height="200" src="http://www.intersog.com/images/olypmic2.jpg" style="forpost: right; float: left; margin-up: 1em; margin-right: 1em;"></a><br/>\r\n This app will give you a full overview of all events in detail, covering event schedules, news updates and background information on each sport. An interesting feature of the app is that it utilizes Push technology to track the medals awarding ceremonies, which can be sorted by sport or by country. You can download this free app directly from the iTunes App Store at \r\n<a href="http://itunes.apple.com/us/app/winter-2010/id352512652?mt=8" target="_blank" rel="nofollow"> http://itunes.apple.com/us/app/winter-2010/id352512652?mt=8</a>\r\n<br /><br />\r\nJulia Zagoruiko,<br />\r\nDirector of Mobile Development', '', 1, 9, 0, 23, '2010-02-11 09:09:09', 115, 'Julia Zagoruiko', '2010-02-26 03:36:43', 115, 0, '0000-00-00 00:00:00', '2010-02-11 08:55:38', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 27, 0, 41, '', '', 0, 1428, ''),
(178, 'We work for Apple', '', '', '<img alt="No Pain, No Gain" width="200" height="102" src="http://www.intersog.com/images/nopainnogain_s.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\nGetting so close to market release and then being stuck with Apple`s approval process really hurts. I received an email from Apple few days ago that ComboApp will require ``additional time`` for review, wrote back asking for more details and a day later got a response that  they are ``looking into the status`` of ComboApp - whatever that might mean.<br/><br/>\r\n\r\nI guess the review process was forwarded to higher level management; I envision several Apple directors are sitting in the boardroom over a heated discussion on what to do with ComboApp. Whatever happens, it just proves that we are inventing something edgy and revolutionary, something that makes them think and adapt. There are several possible outcomes - Apple might reject our app, or they may approve it, or they might change the age brackets - the latter is less possible. So for now, guys and gals - let`s just continue working on our Android version - which is by the way, in my hands right now, and I am about to perform tests on Motorola Droid device. Over.\r\n<br/><br/>\r\nVadim Chernega,<br/>\r\nINTERSOG CEO', '', 1, 9, 0, 23, '2010-02-26 10:35:17', 115, 'Vadim Chernega', '2010-03-01 08:38:00', 115, 0, '0000-00-00 00:00:00', '2010-02-26 10:35:17', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 12, 0, 30, '', '', 0, 1454, ''),
(169, 'Hellemental: The story behind the game', '', '', 'It''s been a couple of weeks since my last blog so there is a lot to catch up on. With the release of our latest title ''Hellemental'' hot off the press, it''s a good time to talk about where this idea came from and how the concept evolved.<br/> <br/>\r\n\r\nOriginally the brain child of Roman Kolos, Hellemental was born from a simple idea to create a tower defence style game that featured magic and fantasy with daemons of each element attacking some town or city. <br/> <br/>\r\n\r\nAs development on the project started everyone grew excited and started to add their own great ideas to the mix and very quickly  ''Hellemental'' evolved into a brand new breed of game with more arcade action than your average tower defence game. <br/> <br/>\r\n\r\nWith a new storyline written and some excellent art work coming from our art team almost everyday, Hellemental became a lot more than the sum of its parts, and it''s something the team and I are very proud of. <br/> <br/>\r\n\r\nCheck out the Hellemental site if you want to know more about our game and it''s story: <a href="http://www.dirtyedge.com/hellemental" target="_blank">Hellemental Official Website</a>\r\n<br/> <br/>\r\n\r\nLuke Stafford: <br/>\r\nExecutive Producer', '', 1, 9, 0, 23, '2010-02-12 09:21:27', 115, 'Luke Stafford', '2010-02-22 08:10:29', 115, 0, '0000-00-00 00:00:00', '2010-02-12 08:36:24', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 5, 0, 39, '', '', 0, 1466, ''),
(170, 'INTERSOG attends  2010 MacWorld Expo', '', '', 'An opportunity to represent Intersog at the Macworld 2010 Expo is not to be missed.  So,  when on short notice I received the green light to attend, I literally jumped at the chance. Conference attendance needs to be justified, no matter how large or small the business is.  Business is business.   To be more precise: Ã¢â‚¬Å“business is an economic system in which goods and services are exchanged for one another or money, on the basis of their perceived worth".  Every business requires an initial form of investment and a sufficient number of customers to whom its output can be sold consistently at a profit.  Thus, size really does not matter in this situation; profit does. <br/> <br/>\r\n\r\nReturn on investment is a hot term for everyone, it seems, these days.  Naturally, let us take a look and not to limit the brain with the flow of one-directional electrochemical impulses, let us think as well. <br/> <br/>\r\n\r\nMany experts agree that networking is the most valuable benefit for attending a conference.  Yes, it is difficult to quantify, but nevertheless it is of great value.  And yes, being at the conference does improve one''s chances for quality networking simply because the attendees, sponsors and experts belong to a very specific, focused target market. <br/> <br/>\r\n\r\nThe exchange of information, beyond contact information of course, is also very important.  One can be both a teacher and a student, and what''s even better: everyone has the flexibility to chose who he/she wants to be even before the event.  Globalization continues to make the world a smaller place by making information available, but one needs to be willing to be exposed to it and accept it. <br/> <br/>\r\n\r\nInterestingly and very importantly, even strategically, the exchange does not need to happen all the time.  Observing the competition can provide sufficient return on investment in itself.\r\nWhile all of the above benefits are desirable and valuable, it is the strategy that will make attendance a success or a failure.  It is determening who needs the information, how the information will be used, and when it is appropriate to receive and use the information.  Clear goals and objectives need to be set.  A specific person or a group of people needs to be identified and nominated for attendance, and ultimately evaluated on performance. Conference attendance should never be pitched inside an organization, only brought up and discussed.  Otherwise return will not justify the investment.\r\n<br/> <br/>\r\nYuriy Nekrasov, <br/>\r\nSocial Media Specialist ', '', 1, 9, 0, 23, '2010-02-15 15:36:00', 115, 'Yuriy Nekrasov', '2010-02-16 05:12:50', 115, 0, '0000-00-00 00:00:00', '2010-02-15 15:31:44', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 5, 0, 38, '', '', 0, 1438, ''),
(171, 'IMGA Awards', '', '', 'Today the 8 ''must have'' games for your smartphone were announced during 2010 IMGA awards, the largest mobile games competition in the world. Labyrinth 2 from the Swedish studio Illusion Labs was awarded the Grand Prix. Ulrike and Eamon Compliant of Blast Theory from the United Kingdom was named Best Real World Game. Studio FungFung from United Kingdom received the Excellence in Gameplay Award with Minisquadron.  Sniper vs. Sniper online of Com2uS from South Korea won the Excellence in Connectivity Award. James Brown from New Zealand walked away with the Excellence in Design Award for his title Ancient Frog Jr. Wire Way, developed by NowProduction and published by Konami Digital Entertainment was awarded Best Casual Game. <br/> <br/>\r\nEach year, 400 companies from more than 40 countries participate for $40,000 in prizes. One of those companies was Intersog''s Dirty Edge Studio with our Bar Rush game for the Casual Game category. Unfortunately we weren''t in time with new build of our latest iPhone game, Hellemental. <br/> <br/>\r\n\r\nThis year, the Real World Game category showed some very inspiring and innovative concepts. We expect this category to grow in the years to come. The games in the Ã¢â‚¬Å“Best Real World GameÃ¢â‚¬Â category encompassed everything from combining mapping with phone-centric and social interactivity features to powering the location-based game-play with impressive 3D graphics and creative animations. 3D and social integration are today the key to success in the mobile games industry. "We have seen an impressive growth of new platforms and the end of J2ME as the predominant platform...Ã¢â‚¬Â commented Maarten Noyons, founder of the IMGA. <br/> <br/>\r\n \r\nNext year Dirty Edge won''t miss this chance to be awarded at 2011 IMGA! <br/> <br/>\r\n\r\nJulia Guzunova, <br/>\r\nMarketing Director', '', 1, 9, 0, 23, '2010-02-16 10:44:36', 115, 'Julia Guzunova', '2010-02-16 10:44:57', 115, 0, '0000-00-00 00:00:00', '2010-02-16 10:43:40', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 2, 0, 37, '', '', 0, 1431, ''),
(172, 'Mutliplatform Mobile Apps', '', '', 'It came to my attention today that our Marketing Director was responding to a the media request regarding the challenges of application development for multiple platforms. The topic is hot indeed and is of interest to media, analysts and development companies. Especially in light of the just announced release of Windows Mobile 7 and new appstores created by Sony Ericsson, Nokia and other players in the mobile market. So I will post the technical response of the Intersog and ComboApp teams here and then comment on it:<br/> <br/>\r\n\r\n "As for customer apps on different platforms, it is possible to use specifications, some design elements and test-plans in cases where the content is identical.  In the case of differing requests, the code for every platform is essentially written from the ground up, because each platform has its own programming language and its own development tools for mobile applications.  As for the development of a common platform, which may work on multiple devices, it is currently not possible because of the reasons described above.  So, a separate development framework needs to be created for each platform, with the exception of some platforms that operate under the same languageÃ¢â‚¬â€Blackberry and Android for instance. <br/> <br/>\r\n\r\nAs an example IÃ¢â‚¬â„¢d point to AmazonÃ¢â‚¬â„¢s platform for e-booksÃ¢â‚¬â€œKindle. Applications for reading e-books, created on the basis of this platform exist for practically for all smartphones. <br/> <br/>\r\n\r\nLink to the application for iPhone:\r\n<a href="http://itunes.apple.com/us/app/kindle-for-iphone/id302584613?mt=8" target="_blank" rel="nofollow">http://itunes.apple.com/us/app/kindle-for-iphone/id302584613?mt=8</a>\r\n<br/> <br/>\r\nDespite programming for each platform separately, the ComboApp server is the heart of the system.  The server connects all applications between each platform, due to a unified format for data exchange that we have developed.  The server allows us to maximize efforts for establishing system scalability.  Because of this, there is no additional cost for us to connect a single application for multiple platforms, despite the fact that each platform has its own user-interface.  This is important because it allow the user to set up only one program while the server takes care of all other tasks in the background."<br/> <br/>\r\n\r\nSo as you see from this response, the server part is really the key to success with development for different mobile platforms. But I would like to add to this that the overall user experience is highly dependent on the user interface and the app''s rich and visually appealing graphics, which the ComboApp team is currently at its best doing it. <br/> <br/>\r\n\r\nVadim Chernega,<br/>\r\nINTERSOG CEO', '', 1, 9, 0, 23, '2010-02-17 09:21:48', 115, 'Vadim Chernega', '2010-02-17 09:22:39', 115, 0, '0000-00-00 00:00:00', '2010-02-17 09:17:54', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 2, 0, 36, '', '', 0, 1602, ''),
(173, '2010 MacWorld Expo: Reflections', '', '', '<a href="http://www.intersog.com/images/macworld_expo_photo1.jpg" target="_blank">\r\n<img alt="Vancouver Olympic Flame" width="210" height="140" src="http://www.intersog.com/images/macworld_expo_photo1s.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-right: 1em;" ></a>\r\nOnly five hours ago MacWorld Expo 2010 bid farewell to its loyal geek community, tech enthusiasts, and late adopters; yet I miss it already, despite not being a part of the previously mentioned loyal group.  Thirty five thousand feet in the air at two oÃ¢â‚¬â„¢clock in the morning and with a single-serving friend to my left asleep, this perfect environment allows me to reflect on my trip to one of the most anticipated and controversial events of the year.<br/><br/>\r\n \r\n\r\nIn my previous blog post (<a href="http://www.intersog.com/index.php?option=com_content&task=view&id=170&Itemid=37" target="blank">http://www.intersog.com/index.php?option=com_content&task=view&id=170&Itemid=37</a>) I set several parameters to check against, to make sure there is sufficient return on investment when participating in a conference.  Please note that participation levels may vary, hopefully due to strategic objectives and not a limited budget; although a limited budget could be a strategy in itself.  And it was.  It was an experiment, I should say.  The main goal was to scout this event to decide on future involvement on a more ambitious level. <br/><br/>\r\n\r\nWell, the need for future involvement became obvious immediately; just take a look at the caliber of people involved: <strong>Guy Kawasaki</strong> (Alltop), <strong>Jack Dorsey</strong> (Square), <strong>Oliver Breidenbach</strong> (BoinxTV), <strong>Florian Voss</strong> (Microsoft), BT, <strong>John Gruber</strong>, <strong>David Pogue</strong> and many more.  They, no doubt, attract a quality crowd.  It is estimated that 35,000 people attended MacWorld over the three day event. Not all of the attendees were simple end users, consumers.  Innovators, developers and most importantly for me journalists and the press in general were also present.  Just because we didnÃ¢â‚¬â„¢t have a exhibitor''s booth didn''t mean I wasnÃ¢â‚¬â„¢t going to meet people and network.  One is always surrounded by opportunities, just by making yourself available.  As a result I was able to showcase several of our games to potential customers, pitch our new product, ComboApp, to the press, and introduce our application development services to major brands that already expressed a strong interest in working with us.  And these are major industry players I am talking about.  <br/><br/>\r\n\r\n<a href="http://www.intersog.com/images/macworld_expo_photo2.jpg" target="_blank">\r\n<img alt="Vancouver Olympic Flame" width="210" height="140" src="http://www.intersog.com/images/macworld_expo_photo2s.jpg" style="forpost: right; float: left; margin-bottom: 0em; margin-right: 1em;"></a>\r\nThe upcoming release of ComboApp got attention from iPhoneLife Magazine; one of the few publications that''s still available in print.  They do, however, have a strong online presence, and as I found out firsthand, are launching a review blog.  Do not want to jump to conclusions just yet, but the exposure gained through them alone would pay for my trip.\r\n <br/><br/>\r\n\r\nTo continue on opportunities; there was an official MacWorld Expo 2010 photo shoot.  If you really wanted, you could participate; and of course I did - check out the photos :-)<br/>\r\n\r\nThis is free press coverage, free visibility of our brand, and also something for me to brag about. <br/><br/>\r\n\r\nShooting videos, taking pictures, posting live tweets from the keynote presentations are all a part of exposing myself to the surrounding opportunities.  Have to make it a habit, to step out of the comfort zone, in order to make good use of the things available.  Videos and pictures taken at the event will now be used to create a music video clip for our youtube channel.  I was also able to collect some important information on several of our competitors, including their strategy behind event participation.<br/><br/>\r\n\r\nOverall, I recommend sending more people to present Intersog at big industry events for several reasons: for greater visibility of our brand, for greater networking coverage, for personal development of our staff, for dominance over our competitors. <br/><br/>\r\n\r\nThe event is over, but the work is just beginning.<br/><br/>\r\n\r\nYuriy Nekrasov, <br/>\r\nSocial Media Specialist ', '', 1, 9, 0, 23, '2010-02-17 10:07:12', 115, 'Yuriy Nekrasov', '2010-02-26 03:34:28', 115, 0, '0000-00-00 00:00:00', '2010-02-17 10:07:12', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 24, 0, 35, '', '', 0, 1418, ''),
(174, 'New and Noteworthy: Hellemental', '', '', '<a href="http://itunes.apple.com/ca/app/hellemental/id353182108?mt=8" target="_blank">\r\n<img alt="Hellemental" width="270" height="145" src="http://www.intersog.com/images/hellemental_blog_post_s.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;"></a>\r\nIt''s been another great week for Dirty Edge and Hellemental as we were listed on Apples US AppStore in the Noteworthy category. This is really fantastic to get recognition for our efforts especially when it comes from Apple. Our release of ''Hellemental Magic'' the free sample game has done very well already ranking very high in its categories and we''ve seen a good growth in the uptake of Hellemental, our full game now priced at $2.99.\r\n<br/><br/>\r\nThe team is already hard at work on two, yes you heard me TWO, brand new titles expected to be hitting the shelves in the very near future. We have high expectations for these brand new games and intend to build on our success, going from strength to strength.\r\n<br/><br/>\r\nDon''t forget to check out my blog next week as we are planning to release some exclusive news about our upcoming titles.\r\n<br/><br/>\r\nLuke Stafford:<br />\r\n<a href="http://www.dirtyedge.com/hellemental/" targe="_blank"> DirtyEdge.com</a> Game Studio Producer\r\n\r\n', '', 1, 9, 0, 23, '2010-02-19 08:07:02', 115, 'Luke Stafford', '2010-02-19 10:05:05', 115, 0, '0000-00-00 00:00:00', '2010-02-19 08:07:02', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 13, 0, 34, '', '', 0, 1394, ''),
(175, 'Investment into ideas', '', '', '<img alt="Investment in Ideas" width="250" height="108" src="http://www.intersog.com/images//100_dollar_bill_s.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\nIntersog''s business development department continually receives lots of requests from individuals and organizations to develop and publish an app based on their next "big idea". Although some of them are quite interesting and promising, these potential partners underestimate the value of cash and time investment involved in development and think that any development company should be happy to jump on their idea, because it looks brilliant. Indeed, we have and will be doing some of such product development, however it carries a lot of risk and the potential for losses. \r\n<br /> <br />\r\nThe most common mistake on their part is the expectation of equal partnership where they bring just an idea, most often an incomplete and underdeveloped one, without proper market analysis and a workable business model. What we expect though, is full details of the projects, some cash investment, dedication of time and more realistic expectations of potential rewards. A properly prepared and presented pitch has a better chance of being reviewed by Intersog''s business development managers and accordingly, has a better chance to get our attention and possible partnership as a development and publishing partner.\r\n<br /><br />\r\n<strong><a href="http://intersog.com/index.php?option=com_content&task=view&id=115&Itemid=83" target="_blank">Submit your idea!</a></strong>\r\n\r\n<br /> <br />\r\nVadim Chernega,<br />\r\nINTERSOG CEO', '', 1, 9, 0, 23, '2010-02-22 09:10:29', 115, 'Vadim Chernega', '2010-02-23 10:14:38', 115, 0, '0000-00-00 00:00:00', '2010-02-22 09:09:12', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 7, 0, 33, '', '', 0, 1492, '');
INSERT INTO `jos_content` (`id`, `title`, `alias`, `title_alias`, `introtext`, `fulltext`, `state`, `sectionid`, `mask`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `publish_up`, `publish_down`, `images`, `urls`, `attribs`, `version`, `parentid`, `ordering`, `metakey`, `metadesc`, `access`, `hits`, `metadata`) VALUES
(176, 'iPad: just an expensive picture frame?', '', '', '<img alt="Vancouver Olympic Flame" width="210" height="140" src="http://www.intersog.com/images//apple-ipad_s.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\nAs always, an announcement by <strong>Apple</strong> earlier this month jump-started a very passionate debate about whether their new product is revolutionary, evolutionary, or simply a shiny silver bullet shot in the dark that might miss the target.  The cruel anticipation of AppleÃ¢â‚¬â„¢s failure surrounds us; it is in the air we breathe.  Yes, cruel, but not surprising.  Success is always judged and scrutinized, and when little weakness is shown Ã¢â‚¬â€œ there is no mercy.  AppleÃ¢â‚¬â„¢s long history of consecutive, successful, even brilliant innovations statistically increases the chances of the next step being a failure.  And, yes, we are ready for it.  Let us face it: we like stories like Enron, or most recently Toyota. <br/> <br/>\r\n\r\n<strong>iPad</strong>.  What is it?  Is it just an expensive picture frame?  No, it is not.  Apple, and Steve Jobs specifically, would not knowingly release a product that they didnÃ¢â‚¬â„¢t believe, or more importantly think, would be nothing, but revolutionary.  And also it is still too early to tell if it is so, we can confidently dismiss claims of the iPad being a failure from the start, or the iPad being just a Ã¢â‚¬Å“big iPodÃ¢â‚¬Â.  Apple and Steve are not machines, although they produce such.  They are capable of making mistakes.  If they did, realization will come much later Ã¢â‚¬â€œ a year after the rollout possibly, not earlier.  And if that is the case, the mistake will be a revolution in itself.  It will be an eye-opener.  It will become a legendary example for many generations to come. <br/> <br/>\r\n\r\n<strong>MacWorld 2010</strong> was a perfect environment for truth-generation: many industry leaders were present and yet no Apple to sugar-coat the opinions in front.  As expected, the opinions if industry players and leaders varied greatly.  Why? Are they not equipped better than most to make a call on something like the success of the iPad?  And the simple truth is no, they are not.  Experts outside of Apple are just guessing like everyone else.  Even Mr. Gruber, a well established and respected critic of Apple and writer had difficulty pointing out weaknesses of this amazing company.  "The greates weakness of Apple is Steve Jobs" - he addressed a massive audience during one of the most aticipated sessions of the MacWorld 2010.  He went on to explain that Steve Jobs is a weakness only because he will be gone at some point.  Well, that is later.  Now he is there and he is the driving force behind the iPad.  John (Mr. Gruber) also pointed out AT&T as the second greates weakness; and yet once again followed by explaining why Apple chose and continues to work with them: "Apple has them by the balls".  It is true, Apple is the only advantage AT&T has, and thus will always do what Apple requests.  There is a strategy, a great strategy, behind every move Apple makes.  <br/> <br/>\r\n\r\nEveryone, of course, is focused on the missing features of the iPad.  Surprisingly not many realized that iPadÃ¢â‚¬â„¢s missing features are actually a good marketing strategy.  Just to get something straight: do you really need a photo camera with a 10Ã¢â‚¬Â screen?  Just because something can be included, it is not necessarily  logical to do so.  iPad is a consumer product for common people.  It was not designed for nerds, and techies.  As Jonathan Ive said: "You don''t have to fit yourself to iPad.  It fits you". The next generation iPad, I personally believe,  will include a photo/video capability, but this will only happen as an added extra/benefit for live video communications perhaps, months after iPad will establish itself as the leader if not the only device for media consumption.  This is Apple''s immediate and only goal for now. <br/> <br/>\r\n\r\nThe way we consume media will change, it will be revolutionized and is already taking place.  Many publishers are busy creating platforms and applications to take their business model to the next level.  Scott Dadich, Creative Director of Wired Magazine and Jeremy Clark, Adobe Experience Design Director, explain where journalism and media are headed: <a href="http://bit.ly/cQIuFN " target="_blank">http://bit.ly/cQIuFN</a> It might seem inappropriate to use Adobe as an example here, but the point is that everyone will move this way, and Apple once again is in the forefront of this shift.  The device itself will fuel competition in the tablet market, leading to improved technology and ultimately a great price for such technology.  RIM sells more devices than Apple, and devices built on the Android platform are about to overtake Apple as well, but it doesnÃ¢â‚¬â„¢t make <strong>iPhone</strong> a failure.  The same fate awaits the iPad.  Plus, Apple couldnÃ¢â‚¬â„¢t time it any more perfectly with the global Ã¢â‚¬Å“greenÃ¢â‚¬Â movement.  It is safe to assume that printing will dramatically decrease; donÃ¢â‚¬â„¢t want to say Ã¢â‚¬Å“disappearÃ¢â‚¬Â just yet. <br/> <br/>\r\n\r\nTo conclude, iPad has yet another trick up itsÃ¢â‚¬â„¢ sleeve: gaming will expand and improve once again.  It will allow existing developers to grow and new ones to enter.  Further development of multi-touch technology will bring us closer to the Ã¢â‚¬Å“minority reportÃ¢â‚¬Â experience, overall improving efficiency in many industries. <br/> <br/>\r\n\r\nIt might be just a little over-hyped, but the world is ready and needs the iPad now.  To assume Apple made an uncalculated leap is foolish. <br/> <br/>\r\n\r\nYuriy Nekrasov, <br/>\r\nSocial Media Specialist ', '', 1, 9, 0, 23, '2010-02-24 10:52:57', 115, 'Yuriy Nekrasov', '2010-02-24 11:27:15', 115, 0, '0000-00-00 00:00:00', '2010-02-24 10:52:57', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 10, 0, 32, '', '', 0, 1399, ''),
(177, 'Re-charging. A pain in the...brain.', '', '', '<a href="http://www.intersog.com/images/recharger.jpg" target="_blank">\r\n<img alt="Powermat" width="300" height="90" src="http://www.intersog.com/images/recharger_s.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;"></a>\r\nI''m so fed up with the necessity to recharge different devices with different chargers. When you take a business trip you have to have at least 3 different type chargers with you. But there is a light in the end of the tunnel, companies which develop accessories have been working on a universal charger.<br /><br />\r\nDuring the 2010 Mobile World Congress in Barcelona, Powermat presented an Adaptive AS chip. Any mobile device manufacturer will be able to incorporate this chip to allow their device to be charged without any wires involved - just put a device on a special Powermat(c) pad and it will recharge. The company already sells batteries for the Blackberry Curve and Tour - $30, Nintendo DSi - $30 and iPhone - $40, which can be charged this way. This technology will essentially allow any device to get rid off its wired  charger.\r\n<br /><br />\r\nThe device itself is a pad, which utilizes magnetic induction to charge a device''s battery. It takes energy directly from a wall socket. To charge a phone or a game console just put it on the pad and that''s it - it will be recharged.\r\n<br /><br />\r\nJulia Zagoruiko,<br />\r\nDirector of Mobile Development', '', 1, 9, 0, 23, '2010-02-25 08:13:51', 115, 'Julia Zagoruiko', '2010-02-25 08:28:58', 115, 0, '0000-00-00 00:00:00', '2010-02-25 18:11:31', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 5, 0, 31, '', '', 0, 1485, ''),
(179, 'Creative nature of programming and motivation', '', '', '<img alt="Motivation" width="180" height="135" src="http://www.intersog.com/images/self-motivation_s1.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\n\r\nOur job - let''s call it programming - is very demanding and technical. But at the same time it is very much creative, i.e. it is rewarding for people eager to create  something out of nothing. And this is the the most interesting part of our work  to people like me at least. But this attitude also has a drawback. It is a negative impact  on stability  and morale. No one likes to fix bugs, write documentation and work with problems that  are out  of their control (like the customer''s mood).<br /><br />\r\n\r\nAll these issues affect productivity a lot. And the only good motivator even for very self - motivated people is a good perspective. No perspective means no motivation. The combination of creativity, sense of duty and good perspective is unbeatable. Creativity  is mostly  genetics. Sense of duty is grown in humans during childhood  by family, school and country. <br /><br />\r\n\r\nThe last  part -  a good perspective  is a  responsibility of manager. <br /><br />\r\n\r\n\r\nSergey Rogachov, <br />\r\nINTERSOG CTO', '', 1, 9, 0, 23, '2010-03-01 09:09:26', 115, 'Sergey Rogachov', '2010-03-01 09:16:24', 115, 0, '0000-00-00 00:00:00', '2010-03-01 09:09:26', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 8, 0, 29, '', '', 0, 1321, ''),
(180, 'Learning To-Go rulez', '', '', '<img alt="Learning To-Go rulez!" width="130" height="130" src="http://www.intersog.com/images//learning_to_go_img_sm.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\nAfter cooperating with the AppStore for over a year, Intersog was faced with a question: "What drives the Appstore - games, mLearning apps, entertainment or something else?  What is more real and vital, what generates money, experience or just influence?  With the following steps, I''ll start by showing you what makes our business stable and profitable business by integrating different types of applications in our portfolio. <br/> <br/>\r\n\r\nGames are the most popular category in the AppStore. It''s the toughest and most competitive market I''ve seen. Intersog released 3 high-quality games including one superb quality 3D game, Hellemental. We had, and still have, very high expectations, but what were the results? We were selected for the Hot New Games section, reached 70th place in the Role Playing game category and yet returned less revenue than expected each day. The same situation happened  with our 2 previous games. Our talented game team from Dirty Edge Game Studio continues to produce exciting and professional iPhone games, but is it possible for them to compete with the Big Titles from the Big Developers in this conservative market? <br/> <br/>\r\n\r\nThe first $ millions in the AppStore were made by individuals and small companies who created very simplistic but entertaining apps. Where are they now? I haven''t seen any similar apps in the TOP 100 for a long time. The users seem getting fed up with such trivial programs. We noticed this sales trend by analyzing our own sales numbers of our independently produced apps.\r\n<br/> <br/>\r\nMobile Learning... If you google this phrase you''ll find numerous associations, research centers and institutes. Nowadays, it''s become a global mobile learning revolution. People of all the ages want to learn anytime and anywhere, and mobile devices are the best solution to help them. Over a year ago we created the Learning To-Go educational platform which is based on the fundamental concepts of mobile learning industry. The applications created on this model have held long-term interest bu users across platforms - Appstore, Android and RIM markets. We see very stable and profitable results. \r\n<br/> <br/>\r\nWhich proves that while our society tries to keep up with the rate of change, we are increasingly trying to get the most out of personal development.\r\n<br/> <br/>\r\n\r\nJulia Guzunova, <br/>\r\nMarketing Director', '', 1, 9, 0, 23, '2010-03-02 10:10:51', 115, 'Julia Guzunova', '2010-03-02 10:20:51', 115, 0, '0000-00-00 00:00:00', '2010-03-02 10:10:51', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 10, 0, 28, '', '', 0, 1436, ''),
(181, '2010 MacWorld Expo: Photo report', '', '', '<div  style="float: left; margin-bottom: 2em; margin-right: 5em;">\r\n<a href="http://twitpic.com/14pp31" target="_blank"><img alt="" width="200" height="150" hspace="5" src="http://www.intersog.com/images/macworldexpo/1.jpg" align="left"></a>\r\n 8am.  O''Hare International Airport.  First business trip for Intersog.  This cool-looking tunnel is a good representation of my mood and expectations: network of bright ideas, connections, technology, innovation, structure, future...\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 2em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16dhng" target="_blank"><img alt="" width="200" height="150"  hspace="5" src="http://www.intersog.com/images/macworldexpo/2.jpg" align="left"></a>\r\n\r\nActually looking forward to spending the next four hours on the plane.  Strange, yes, I know.  First hour: tomato juice.  Second hour: play games on iPod (notice for work, to polish my presentation skills). Third hour: more tomato juice, and a random conversation with a stranger (a must).  Fourth hour: looking down on mountains while listening to pilot radio channel. \r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 2em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16di4f" target="_blank"><img alt="" width="200" height="150"  hspace="5" src="http://www.intersog.com/images/macworldexpo/3.jpg" align="left"></a>\r\nHello, San Francisco!  Not much sun, but temperatures in upper 50s is a nice welcome.  Powell St. and Market St., Union Square is just around the corner.  Five-minute walk to hotel.  Shower, coffee, suit... no, no, jeans and sports coat is more appropriate.  Out to Moscone Center for a quick look-around.\r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 2em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16dlkz" target="_blank"><img alt="" width="200" height="150"  hspace="5" src="http://www.intersog.com/images/macworldexpo/4.jpg" align="left"></a>\r\n\r\nHello, MacWorld2010!  Attending Guy Kawasaki''s talk show.  Great guests are expected to join, including Jack Dorsey of Square and Oliver of BoinxTV among others.\r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 1em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16j1yb" target="_blank"><img alt="" width="200" height="150"  hspace="5" src="http://www.intersog.com/images/macworldexpo/5.jpg" align="left"></a>\r\n\r\nHere I am...                          \r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 1em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16dlx0" target="_blank"><img alt="" width="200" height="150"  hspace="5" src="http://www.intersog.com/images/macworldexpo/6.jpg" align="left"></a>\r\n\r\n ''Allow me to introduce...''\r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 1em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16dm97" target="_blank"><img alt="" width="200" height="150"  hspace="5" src="http://www.intersog.com/images/macworldexpo/7.jpg" align="left"></a>\r\n\r\n ''Guy Kawasaki, welcome!!!''\r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 2em; margin-right: 5em;">\r\n<a href="http://twitpic.com/14ppbe" target="_blank"><img alt="" width="200" height="150"  hspace="5" src="http://www.intersog.com/images/macworldexpo/8.jpg" align="left"></a>\r\n\r\nOh, that strange obsession with famous characters never dies.  Characters change, but obsession remains.  First it is Micky Mouse in Disney World, and now these at Mac World...\r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 2em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16dhj8" target="_blank"><img alt="" width="200" height="300"  hspace="5" src="http://www.intersog.com/images/macworldexpo/9.jpg" align="left"></a>\r\n\r\nParticipating in the official MacWorld photo shoot.  Great way to get some free publicity...  Looking good in the air, don''t you think?\r\n\r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 2em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16dmcr" target="_blank"><img alt="" width="200" height="133"  hspace="5" src="http://www.intersog.com/images/macworldexpo/10.jpg" align="left"></a>\r\n\r\nComboApp was there. \r\n\r\n</div>\r\n\r\n<div  style="float: left; margin-bottom: 2em; margin-top: 0em; margin-right: 5em;">\r\n<a href="http://twitpic.com/16dmel" target="_blank"><img alt="" width="200" height="133"  hspace="5" src="http://www.intersog.com/images/macworldexpo/11.jpg" align="left"></a>\r\n\r\nIntersog was there.\r\n\r\n</div>', '', 1, 9, 0, 23, '2010-03-03 08:23:44', 115, 'Yuriy Nekrasov', '2010-03-05 02:24:29', 115, 0, '0000-00-00 00:00:00', '2010-03-03 08:23:44', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 59, 0, 27, '', '', 0, 1451, ''),
(182, 'Team Work', '', '', '<img alt="Team work" width="223" height="150" src="http://www.intersog.com/images/blogimg/team_work_tn.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\nLast week we had to lay off 2 employees from our Mobile Application Development team. Obviously, it''s not a pleasant thing to talk about but as in any other company it happens from time to time. As you well know people come and go from Google, Apple, Yahoo and so on. The guys who left the company were completely different personalities and they had a different reason for leaving the company. One of them left the company to pursue a good opportunity she found for herself in other company, the second person has been laid off because of a lack of personal responsibility at work. <br/> <br/>\r\n\r\nThese people''s departure made me look differently at all people in my team. Here is the thing - it turned out that professionals do not just leave and it''s very important and good thing to know. The people who leave the company are the ones, who don''t want to grow, who can''t work in a team or simply can''t stand the company''s demanding workflow, which is inevitable for a tech company to have in the 21 century if it seeks to succeed in the market.\r\n<br/> <br/>\r\nWe''ve already found candidates for their positions and made appropriate offers. I really don''t want to make a mistake with my choice and so I hope that we''ve chosen people, who aren''t afraid of difficulties, aren''t afraid to learn and move forward and are responsible for their work performance. I know they will become a great part of the INTERSOG team.\r\n<br/> <br/>\r\nJulia Zagoruiko, <br/>\r\nDirector of Mobile Development', '', 1, 9, 0, 23, '2010-03-09 03:02:55', 115, 'Julia Zagoruiko', '2010-03-09 03:05:57', 115, 0, '0000-00-00 00:00:00', '2010-03-09 03:02:55', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 6, 0, 26, '', '', 0, 1424, ''),
(183, 'ComboApp went live! Welcome!', '', '', '<img alt="ComboApp went live!" width="158" height="200" src="http://www.intersog.com/images/blogimg/cobmoapp_launch_sm.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\n\r\nI don''t think it''s possible to express in words the anticipation of this moment, but finally it has happened: ComboApp(c) - the <a href="http://comboapp.com" target="_blank"> iPhone, iPad and Android App Builder</a> for the rest of us has launched!!! At this point it works as a web-based service at <a href="http://comboapp.com" target="_blank">ComboApp.com</a> and as an Android phone application, which is available on Android Market, just search for ComboApp to get your hands on the app. <br/><br/>\r\n\r\nWe came a long way, yes you read it right - a long way, because you perceive several months of intense project development that seemed like several years. I''m writing this post on behalf of every member of the team, who worked a lot, quite often spending weekends in the office to finish crucial things in the development. Thank you guys for the great work and tremendous effort to make it happen!<br/><br/>\r\n\r\nI think "launch" describes the moment better than any other, because in many ways it''s like launching a space ship - the intense teamwork for long periods of time, with lots of testing, re-coding and working on tons of things, which were impossible to plan and predict originally. At this point the issue is that Apple still hasn''t approved the app we submitted a week ago, it''s the second attempt and the delay has nothing to do with a  technical matter but the business model we''ve developed for the ComboApp and had to discuss it with Apple.<br/><br/>\r\n\r\nNow as we''re launching ComboApp I realize that it''s just the beginning.  We have a bunch of ideas to develop and add to the service in the future and of course customer support will be a whole new aspect to deal with. So, without further ado, all business owners who have plans to develop an app for the iPhone, iPad or Android phone welcome to ComboApp.com!\r\n\r\n<br /><br />\r\nArtyom Diogtev,<br/>\r\nInternet Marketing Manager.', '', 1, 9, 0, 23, '2010-03-10 03:52:13', 115, 'Artyom Dogtiev', '2010-03-29 07:37:54', 115, 0, '0000-00-00 00:00:00', '2010-03-10 03:52:13', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 11, 0, 25, '', '', 0, 1702, ''),
(184, 'New project: Space Environment Technologies', '', '', '<img alt="Team work" width="98" height="150" src="http://www.intersog.com/images/blogimg/global_tec_space_post1.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\nToday we''ve begun to work on a very interesting project - Space Environment Technologies. \r\nSpace weather is a highly complex set of concepts that are difficult to reduce to a simple well-organized list or set of graphics. Even for specialists in the field, it is difficult to succinctly summarize the current state of the solar-terrestrial environment. To do so without confusing those unfamiliar with space weather is even more difficult.<br /><br />\r\n\r\n<img alt="Team work" width="123 height="150" src="http://www.intersog.com/images/blogimg/global_tec_space_post2.jpg" style="forpost: right; float: left; margin-bottom: 0em; margin-left: 1em;">\r\nThe challenge will be to organize the SpaceWx App to present meaningful real-time space weather data, while providing an enjoyable educational experience for newcomers to space weather. The first version of the iPhone application is already available at - <a href="http://itunes.apple.com/us/app/space-wx/id328346172?mt=8">http://itunes.apple.com/us/app/space-wx/id328346172?mt=8</a>. The new, more sophisticated version, which we''ve already begun to develop will be available on iTunes App Store by the beginning of May, 2010.\r\n<br /><br />\r\nJulia Zagoruiko,<br />\r\nDirector of Mobile Development\r\n\r\n', '', 1, 9, 0, 23, '2010-03-11 08:58:45', 115, 'Julia Zagoruiko', '2010-03-11 09:20:46', 115, 0, '0000-00-00 00:00:00', '2010-03-11 08:58:45', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 8, 0, 24, '', '', 0, 1504, ''),
(185, 'Interviews with analysts', '', '', '<img alt="Interviews with Analytics!" width="160" height="128" src="http://www.intersog.com/images/blogimg/fire_tn.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\n\r\nThe release of ComboApp has generated a lot of interest from industry analysts. I participated in several interviews last week and have few more scheduled this week. Gartner, Forrester Group and Mavin Digital are just a few of the names that are interested in what we do at ComboApp. The most common questions are about platfrom differentiators, the business model and our competitors as well as my market forecast. Well, it makes sense to ask the opinion of a CEO of one of the premier market players in the mobile development field. :-) Overall I feel the excitement growing and it keeps getting hotter!\r\n<br/><br/>\r\nVadim Chernega,<br/>\r\nINTERSOG CEO', '', 1, 9, 0, 23, '2010-03-16 08:59:02', 115, 'Vadim Chernega', '2010-03-16 09:05:01', 115, 0, '0000-00-00 00:00:00', '2010-03-16 08:58:28', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 9, 0, 23, '', '', 0, 1478, ''),
(186, 'Apple pushes out iPhone 3.2 SDK beta 5', '', '', '<img alt="SDK 3.2 Beta 5" width="160" height="200" src="http://www.intersog.com/images/blogimg/3_2_5_beta_sdk_post_sm.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\n\r\nAs we approach April 3rd at full speed, Apple is running out of time to make finishing touches to the iPhone OS SDK, but they''ve managed to issue perhaps the last update prior to the iPad hitting stores. This past Wednesday, Apple released the iPhone OS 3.2 SDK Beta 5 for the iPad via the iPhone Developer Center. According to <a href="http://www.macnn.com/articles/10/03/17/ipad.sdk.still.unfinished.at.beta.5/" rel="nofollow" target="_blank">MacNN</a> the release came just over a week after the launch of Beta 4. It''s unknown what changes this beta brings to the table compared with the previous version (we haven''t noticed anything visible yet) but apparently it focuses on fixing bugs rather then adding new features. Obviously Apple doesn''t want to take any chances introducing new features in the SDK so close to launch when there is so much at stake and so much depends on how successful third-party developers will be in developing apps specifically for the iPad.<br /><br />\r\n\r\nDespite many allusions to multitasking, it''s not there yet. This core feature will likely be introduced no earlier than iPhone SDK 4.0. \r\n<br /><br />\r\nJulia Zagoruiko,<br />\r\nDirector of Mobile Development', '', 1, 9, 0, 23, '2010-03-19 04:04:35', 115, 'julia Zagoruiko', '2010-03-22 08:50:45', 115, 0, '0000-00-00 00:00:00', '2010-03-18 04:03:49', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 13, 0, 22, '', '', 0, 1449, ''),
(187, 'Linkedin as a business tool', '', '', '<img alt="SDK 3.2 Beta 5" width="160" height="54" src="http://www.intersog.com/images/blogimg/linkedin_sm.jpg" style="forpost: right; float: right; margin-bottom: 0em; margin-left: 1em;">\r\n\r\nToday I was editing my Linkedin profile to update it with latest info\r\non ComboApp, its legal status and my position with the company. Having\r\ndone that (<a href="http://ca.linkedin.com/in/vchernega" target="_blank"> http://ca.linkedin.com/in/vchernega </a>) I decided to\r\nwrite about the benefits of Linkedin. Looking for some reference, I found\r\nthis <a href="http://gilbertdirectmarketing.wordpress.com/2009/02/27/5-tips-for-using-linkedin-as-a-business-tool/">article</a> By Jim Gilbert, have copied the text here, because it so perfectly describes\r\nthe benefits of the platform:<br /> <br />\r\n\r\nLinkedin is an exceptional tool for personal business networking, and\r\nbusiness promotion. There are several tips on how to make the most out\r\nof it: <br /> <br />\r\n\r\n1. Use the Q&A function. The Q&A function of LinkedIn is a powerful\r\nrevenue-generating tool. Try using the advanced answers search to find\r\nquestions specific to your companyÃ¢â‚¬â„¢s expertise. DonÃ¢â‚¬â„¢t pitch your\r\ncompanyÃ¢â‚¬â„¢s products or services here, just give the best Ã¢â‚¬â€ or most\r\naltruistic Ã¢â‚¬â€ answer you can. The Q&A is definitely a give-to-get\r\nmedium: Give freely and youÃ¢â‚¬â„¢ll get back in spades.\r\n<br /> <br />\r\n2. Become an expert. When a question is asked on LinkedIn, it remains\r\nopen for answers for seven days. After the question closes, the asker\r\ncan rate the best answer to that question. The best answerers for a\r\ngiven question are awarded expert status on LinkedIn. From that point\r\non, whenever an expert answers a question, that expert gets an expert\r\nbadge. PeopleÃ¢â‚¬â„¢s expert status follows them around wherever they go on\r\nthe site. Since youÃ¢â‚¬â„¢re representing your company, this creates\r\nexpertise for it as well.\r\n<br /> <br />\r\n3. Join groups. You can join as many as 50 LinkedIn groups. When you\r\njoin, introduce yourself and your services. Much like Q&A, this is a\r\ngive-to-get medium.\r\n<br /> <br />\r\n4. Start a group. Starting a group is super easy Ã¢â‚¬â€ just a couple of\r\nclicks and youÃ¢â‚¬â„¢re done. Start a group around your companyÃ¢â‚¬â„¢s core\r\ncompetencies. For example, if youÃ¢â‚¬â„¢re a printer, set up a group for\r\npeople to ask questions about printing. If youÃ¢â‚¬â„¢re a search engine\r\nmarketing company, set up a SEM for beginners group.\r\n<br /> <br />\r\n5. Promote your blog. Many of you already have corporate blogs and\r\nhave produced whitepapers and corporate presentations. Promote your\r\nblog in the news section of the groups you belong to. Promote\r\nwhitepapers and presentations in the groups as well via the discussion\r\nfunction. This adds value and enhances your image.\r\n<br /><br />\r\nVadim Chernega,<br />\r\nINTERSOG CEO', '', 1, 9, 0, 23, '2010-03-30 03:27:11', 115, 'Vadim Chernega', '2010-03-30 10:23:48', 115, 0, '0000-00-00 00:00:00', '2010-03-30 10:00:11', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 16, 0, 21, '', '', 0, 1274, ''),
(188, 'AppsFire AppStar Awards 2010 Nominees ', '', '', '<img alt="AppsFire AppStar Awards 2010 Nominees " width="250" height="145" src="http://www.intersog.com/images/blogimg/appstarawards.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\nDirtyEdge has some frankly drop-dead-wicked news to share this month and no, it is not an April Fool!<br /> <br />\r\n\r\n\r\nOur brand new title ''<strong>X-Treme Sports: Biker</strong>'' has been selected as one of 9 finalists for the prestigious and much coveted AppsFire AppStar Awards 2010. <br /> <br />\r\n<img alt="X-Treme Sports: Biker" width="160" height="120" src=" http://www.intersog.com/images/blogimg/impressive.jpg" style="forpost: right; float: left; margin-bottom: 0em; margin-right: 1em;">\r\nWe are incredibly proud and excited to be selected for this competition and to find ourselves listed alongside major heavyweights such as Disney really shows that our studio has the ability to compete at this very high level. We personally think our game is highly innovative and unique with exciting game play and accessible challenges which have a better than good chance of standing out from the crowd. We also know that it would make an excellent game for Apples new iPad hitting the shelves very soon so we are as eager as everyone else to get our developer claws on this incredible piece of hardware. <br /> <br />\r\n\r\nIn short: To even be nominated in this category is a great honour for us. <br /> <br />\r\n    \r\nThe Winners are due to be announced at the 360iDev conference in San Jose, CA. For more information visit <a href="http://www.360idev.com" target="_blank" rel="nofollow">http://www.360idev.com</a>\r\n<br /> <br />\r\n...And that''s not all!\r\n<br /> <br />\r\nIt''s been a very intense couple of weeks here at the Intersog game studio ''Dirty Edge'' and aside from the excitement for the AppStar competition we''ve all been deeply focused on our new title heading towards the AppStore later this month. Not to forget we also moved to our brand new office space last week as our team continues to expand. Somehow through this chaos something beautiful has begun to grow.\r\n<br /> <br />\r\nWe also successfully launched of our official Twitter.com and Facebook Fan pages hitting the ''interweb'' earlier last week:\r\n<br /> <br />\r\n<img src="http://www.intersog.com/images/blogimg/twitterlogo.jpg" width="50" height="50"></a><a href="http://twitter.com/dirtyedge" target="_blank">http://twitter.com/dirtyedge</a> <br />\r\n<img src="http://www.intersog.com/images/blogimg/facebooklogo.jpg" width="50" height="50"></a><a href="http://www.facebook.com/dirtyedge " target="_blank"> http://www.facebook.com/dirtyedge</a>\r\n<br /><br />\r\nWe hope you will follow us or even become a fan and join the ever increasing interest in our activities around and upcoming products.\r\n\r\nIt really looks like 2010 is set to be a very interesting year, don''t forget to vote for us: <a href="http://video2.appsfire.com/video/3349856-x-treme-sport-biker-first-sneak-peak-from-dirty-edge" target="_blank"> http://video2.appsfire.com/video/3349856-x-treme-sport-biker-first-sneak-peak-from-dirty-edge</a>', '', 1, 9, 0, 23, '2010-04-01 14:33:04', 115, 'Luke Stafford', '2010-04-01 15:22:24', 115, 0, '0000-00-00 00:00:00', '2010-04-01 14:33:04', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 25, 0, 20, '', '', 0, 1304, ''),
(189, 'Enneagram Personality Full Test', '', '', '<a href="http://itunes.apple.com/us/app/enneagram-personality-short/id311628683?mt=8" target="_blank"><img alt="Enneagram Personality Full Test" width="195" height="372" src="http://www.intersog.com/images/blogimg/enn.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;"></a>\r\n\r\nWe just finished development of one of our applications - the ''''Full Enneagram Personality Test" and are now waiting for approval from Apple. We developed this project with our regular partners at the Enneagram institute<a href="http://www.enneagraminstitute.com/" target="_blank"> http://www.enneagraminstitute.com/ </a><br /><br />\r\n     The Enneagram Personality Full Test  can give you the power and convenience to gain personal awareness of family members, clients, business colleagues, and yourself. For HR professionals, the test is a valuable and accurate way to identify personality traits of existing or prospective employees in order to work with them more effectively.<br /> <br />\r\n    The Enneagram recognizes 9 distinct personality types, the mix of which varies in each individual. In most cases, the Enneagram Personality Full Test reveals the userÃ¢â‚¬â„¢s dominant personality type, and also indicates the relative strengths of the other eight personality types in their psychological makeup. Results include: type descriptions, structural patterns, as well as relationship and growth suggestions for each personality type. <br /> <br />\r\n    Easily completed in about 40 minutes, the Enneagram Personality Full Test is a convenient tool for individuals as well as businesses; helping professionals to increase insight into themselves or their clients. People around the world have found this test exceptionally useful in many practical applications. <br /> <br />\r\n    While we are waiting for this application on the App store, you can use our Short Personality Test to identify your personality type definition.  <a href="http://itunes.apple.com/us/app/enneagram-personality-short/id311628683?mt=8" target="_blank"> http://itunes.apple.com/us/app/enneagram-personality-short/id311628683?mt=8 </a> <br />\r\n    Learn and enjoy. <br /> <br />\r\n\r\nJulia Zagoruiko <br />\r\nDirector of Mobile Development\r\n', '', 1, 9, 0, 23, '2010-04-02 10:02:01', 115, 'julia Zagoruiko', '2010-04-06 05:12:13', 115, 0, '0000-00-00 00:00:00', '2010-04-02 10:02:01', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 16, 0, 19, '', '', 0, 1389, ''),
(190, 'Brands and Social Media', '', '', '<img alt="Brands in social media" width="160" height="134" src="http://www.intersog.com/images/blogimg/social_med_bandvan.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nMany of our clients are both curious and confused about Social Media.  They know they need to maximize their Social Media footprint for their business, but most are faced with 2 main problems: how to effectively launch campaigns and, more importantly, how to measure the results to determine the true return on investment.\r\nThis is particularly true for brands, whoÃ¢â‚¬â„¢s brand equity can be inversely affected by their presence, or lack thereof, in the Social Media universe.  For this reason, I wanted to pass along the following <a href="http://adage.com/digitalnext/article?article_id=142907" target="_blank">article</a>, which I found in Advertising Age magazine.\r\nThe article tries to use statistical data to determine which rules of Social Media hold true for companies across business categories.  The findings are a list of best-practices for this still emerging area of marketing, many of which have been incorporated into our marketing services strategy for some time.  While the article a good framework for Social Media planning, it should be noted that Social Media is a very dynamic environment.  ThatÃ¢â‚¬â„¢s why an experienced Social Media team is so vital to delivering positive results.\r\n<br /><br />\r\nJulia Guzunova, <br />\r\nMarketing Director', '', 1, 9, 0, 23, '2010-04-06 10:30:48', 115, 'Julia Guzunova', '2010-04-15 01:36:25', 115, 0, '0000-00-00 00:00:00', '2010-04-06 10:29:49', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 18, 0, 18, '', '', 0, 1456, ''),
(191, 'Right from the Labs: Brand New LTG app', '', '', '<img alt="LTG iPhone App" width="57" height="57" src="http://www.intersog.com/images/blogimg/pocket_mba.png" style="forpost: right; float: left; margin-bottom: 1em; margin-right: 2em;">\r\nNew versions of our LTG products line are now available on iTunes App Store:<br />\r\n<ul>\r\n<li><a href="http://itunes.apple.com/ca/app/real-estate-financing-investing/id317551743?mt=8" target="_blank">Real Estate Financing and Investing 2.0</a></li>\r\n<li><a href="http://itunes.apple.com/ca/app/pocket-cfo/id340017029?mt=8" target="_blank">Pocket CFO 2.0</a> </li>\r\n<li><a href="http://itunes.apple.com/ca/app/sales-management/id340015545?mt=8" target="_blank">Sales Management 2.0</a> </li>\r\n<li><a href="http://itunes.apple.com/ca/app/legal-environments-business/id319815930?mt=8" target="_blank">Legal Environments of Business 2.0</a> </li>\r\n<li><a href="http://itunes.apple.com/ca/app/marketing-process/id319055634?mt=8" target="_blank">Marketing Process 2.0</a> </li>\r\n<li><a href="http://itunes.apple.com/ca/app/pocket-mba/id313338528?mt=8" target="_blank">Pocket MBA 2.0</a> </li>\r\n<li><a href="http://itunes.apple.com/ca/app/small-business-guide/id316208526?mt=8" target="_blank">Small Business Guide 2.0</a> </li>\r\n<li><a href="http://itunes.apple.com/ca/app/accounting-and-finance/id314870744?mt=8" target="_blank">Accounting and Finance 2.0</a> </li>\r\n</ul>\r\n\r\nWhat''s new (updates):\r\n<ol>\r\n<li>Full Content Search</li>\r\n<li> Send Content via e-mail</li>\r\n<li> Post a message on Twitter and Facebook</li>\r\n</ol>\r\nAlso we''ve been working hard on the iPad version of LTG. It will be available on iTunes App Store in May. Stay tuned.<br /><br />\r\n\r\nJulia Zagoruiko,<br />\r\nDirector of Mobile Development', '', 1, 9, 0, 23, '2010-04-09 09:33:05', 115, 'julia Zagoruiko', '2010-04-09 10:06:19', 115, 0, '0000-00-00 00:00:00', '2010-04-09 09:33:05', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 21, 0, 17, '', '', 0, 1461, ''),
(192, 'Trying to apply the Functon Point software metric.', '', '', '<img alt="Function Point method" width="160" height="124" src="http://www.intersog.com/images/blogimg/function_point_blog_post.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nFrom the  customer''s point  of view,  the easiest type of project to understand is  the one with a fixed price model. However, for developers  this model is far from satisfying . There are a number of reasons why fixed price projects are hard to make profitable for small software developers.  First  of all, to be profitable it should be reliably estimated. Then the project should be completed on time without significant time over-runs. This means developers can take no risks and that is not  the case with R&D projects. However researchers say there is a way to reliably predict the project schedule using past experience and software measures. The most reliable measure is called Function Point.<br /><br />\r\n\r\nIf you  know the number of FP  in previous projects that involved R&D and you  divide the time with  FPs, you  get the work needed to be performed  by the given  team to  implement FP. Then counting  FPs  for a new project  it is possible to  reliably  estimate the time and budget  needed  to  create the software. This is the method IBM has used for decades to produce quality software on time and within a given budget.  Very  interesting . I  am going to test this approach shortly with smaller projects.\r\n<br /><br />\r\nSergey Rogachov  CTO.', '', 1, 9, 0, 23, '2010-04-15 01:06:07', 115, 'Sergey Rogachov', '2010-04-15 01:30:43', 115, 0, '0000-00-00 00:00:00', '2010-04-14 01:03:13', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 7, 0, 16, '', '', 0, 1487, ''),
(193, 'Women in Mobile', '', '', '<img alt="Women in Mobile" width="160" height="119" src="http://www.intersog.com/images/blogimg/women_in_business_post.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nDespite the notion nowadays that women have unlimited chances for success in business, I''m sure that there are many women will support my thought that it is not entirely true. Of course, achieving success is easier than in the past, but this doesnÃ¢â‚¬â„¢t hold true for all businesses, especially the IT world where men occupy the majority of key positions and in the mobile industry in particular.\r\nThat said, I think that our company is the exception to the rule.  3 Director-level positionsÃ¢â‚¬â€Finance, Mobile and MarketingÃ¢â‚¬â€are currently held by women.  In total, our Marketing and PR departments consist of over 50% women.  And our programming group employs an additional 7 women, a number which is almost unheard of in the male-dominated programming profession.\r\nI was very excited to read this article about 50 Ã¢â‚¬Å“Mobile Women to WatchÃ¢â‚¬Â.  Each of these women serve as good role models for me and my colleagues from the PR & Marketing Groups.  They serve as inspiration as we dedicate ourselves to successful careers in mobile marketing.<br />\r\nPerhaps one of us will make the 2011 list of Mobile Women to Watch.  :)<br />\r\nThe full text of the article can be found here:  <a href="http://www.mobilemarketer.com/cms/lib/6508.pdf" target="_blank"> http://www.mobilemarketer.com/cms/lib/6508.pdf</a><br /><br />\r\n\r\nJulia Guzunova, <br />\r\nMarketing Director', '', 1, 9, 0, 23, '2010-04-15 01:42:24', 115, 'julia Guzunova', '2010-04-15 10:55:48', 115, 0, '0000-00-00 00:00:00', '2010-04-15 01:42:24', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 12, 0, 15, '', '', 0, 1417, ''),
(194, 'Hunting for new projects in the modern world', '', '', '<img alt="Hunting for new projects" width="192" height="256" src="http://www.intersog.com/images/blogimg/hunting_rabbits_blog_post_sm.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\n\r\nI remember the days when the sales process in the IT business was very well structured, with proper hierachy of sales employees, lead generation programs, closure opportunities, personal meetings, formal hand outs to the project team and all the other things typically associated with sales. We would easily jump on the plane and go on sales trip to another continent, with all the associated expenses and challenges. Modern technology brought us the convenience of immediate info exchanges, Skype video calls, online webinars and presentations. And thats absolutely great and very convenient, however there is a drawback - everybody can do that now. \r\n<br /><br />\r\nAnd its no longer about who is faster to the personal meeting, who is more prepared to travel, has a visa, and remembers about cultural differences of potential clients while having dinner with them. Now, it''s all about who has more followers on Twitter, a better network circle on LinkedIn, more fans on Facebook. Times are different, and modern sales activities require more "pull" then "push", and its challenging but very exciting. \r\n<br /><br />\r\nFor this purpose we started a full-blown Marketing Department in Intersog, and these people are doing a fantastic job, so the question is - who is driving the sales for IT company''s now? The answer is simple - here we come, clients, enjoy our new marketing tools!\r\n\r\n\r\n<br /><br />\r\nVadim Chernega - CEO', '', 1, 9, 0, 23, '2010-05-13 02:34:52', 115, 'Vadim Chernega', '2010-05-13 08:13:03', 115, 0, '0000-00-00 00:00:00', '2010-05-13 02:34:52', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 8, 0, 14, '', '', 0, 1237, '');
INSERT INTO `jos_content` (`id`, `title`, `alias`, `title_alias`, `introtext`, `fulltext`, `state`, `sectionid`, `mask`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `publish_up`, `publish_down`, `images`, `urls`, `attribs`, `version`, `parentid`, `ordering`, `metakey`, `metadesc`, `access`, `hits`, `metadata`) VALUES
(195, 'Space WX v.1.4', '', '', '<img alt="Space WX" width="182" height="180" src="http://www.intersog.com/images/blogimg/space_wx_v.1.4.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\n\r\nThe new version of Space WX  v1.4 is now available on AppStore <a href="http://itunes.apple.com/us/app/space-wx/id328346172?mt=8"> http://itunes.apple.com/us/app/space-wx/id328346172?</a>\r\nVersion 1.4 is a major upgrade. The user interface has been completely redesigned, and dozens of images have been added that describe in real-time the sun, solar wind, the Earth''s magnetosphere, and the Earth''s ionosphere/thermosphere. New images from the STEREO, SOHO, and SDO spacecraft are included in this upgrade, as well as neutron monitor data, scintillation maps, and many more. Users can now zoom and pan on images, save an image to a gallery, email an image, and read a description for each data image. Upcoming free upgrades will be adding dozens of new data sources.\r\nThe Space WX project was completed on time and on budget.\r\n <br /><br />\r\n" Good job Intersog team! "from <strong>W. Kent Tobiska, President at Space Environment Technologies, LLC.</strong>  Satisfied customers are the best indicator of our work.', '', 1, 9, 0, 23, '2010-05-13 08:16:23', 115, 'Julia Zagoruiko', '2010-05-14 08:42:42', 115, 0, '0000-00-00 00:00:00', '2010-05-13 08:16:23', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 10, 0, 13, '', '', 0, 1341, ''),
(196, 'Technology is not evil, but rather a teething pain.', '', '', '<img alt="Space WX" width="331" height="222" src="http://www.intersog.com/images/blogimg/hike_post.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nBeing on vacation, I was biking in the Crimea Mountains. We chose an unknown route between different locations using different GPS tracks available on touristÃ¢â‚¬â„¢s forums as guidelines. Several times we got in trouble because of that. <br /> <br />\r\n\r\nSometimes there was no route for bikes at all. Sometimes we were unable to find the breadcrumbs at all, because of a GPS precision error. So to find ourselves, sometimes we used old fashioned paper maps 1:50000.  <br /> <br />\r\n\r\nAnother kind of troubles is unavailable mobile connection and, thus, Internet. So no Google maps ;). <br /> <br />\r\n\r\nHowever the most annoying thing probably was the shortage of power sources. Phones, cameras, camcorders, flashlight,  walkie-talkie,  well , in short  everything was out  of power at  some point. <br /> <br />\r\n\r\nBut that is enough about the bad.  The good: Starting with communication on social websites we were able to ride from end to end without major troubles and were able to get videos & photos of different, mostly very good quality images from amazing places.  After that we were able to share the images (gigabytes) over different Internet means, file sharing services, p2p, image services like Picasa, sharing them between people living in 2 countries and 5 cities without major problems. <br /> <br />\r\n\r\nDespite the troubles I would say it is a triumph of technology.<br /><br />\r\n\r\nSergey Rogachov CTO.\r\n', '', 1, 9, 0, 23, '2010-05-19 02:39:55', 115, 'Sergey Rogachov', '2010-05-20 03:11:47', 115, 0, '0000-00-00 00:00:00', '2010-05-19 02:39:55', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 7, 0, 12, '', '', 0, 1249, ''),
(197, 'Mobile Learning Research: Skype interview', '', '', '<img alt="Mobile Learning" width="250" height="188" src="http://www.intersog.com/images/blogimg/mobile_learning_post_tn.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nA couple weeks ago I had a chance to be convinced once again that life can be really unpredictable. When I began listening podcasts back in late 2005 I couldn''t imagine that several years later I''d be interviewed on Skype by a guy from the company <a href="http://experiencepoint.com/" target="_blank">ExperiencePoint </a>, which conducts field research to obtain information, which companies simply can''t get about their customers. <br /> <br />\r\n\r\nThe interviewer, Andrew, approached me via a private message, after reading my comments on one of the groups I''ve joined on LinkedIn.com. He asked for 15 mins of my time to ask me some questions about my mobile learning experience, particularly how exactly I use my iPod Touch for leaning on the go. Every small detail was valuable - where do I listen to them, do I do anything else at the same time, do I follow up on information I learn from podcasts I listen to and so forth. Also, I was asked to provide a small photo journal with some photos of me as I''m listening to a podcast to get a better picture of the environment. And so I provided it, with detailed captions for every photo. <br /> <br />\r\n\r\nIt was an exciting experience because Andrew told me that he had a long list of different people he''d found for interviews.  A week before he''d interview an astronaut and now it was my turn to share my experience. Well, it wasn''t like I felt like Edgar Mitchell but close :-) <br /> <br />\r\n\r\nA few weeks ago I was watching a retrospective video on AllThingsD.com - Steve Jobs interviewed on stage at <a href="http://video.allthingsd.com/video/steve-jobs-onstage-at-d3-in-2005/CB826DC7-57A4-4DE3-BB2F-255AECDC80E6" target="_blank">D3</a> with Kara Swisher and Walt Mossberg and Steve was presenting a new feature at iTunes - a podcast. It was 2005 and there was a very limited number of podcasts available on iTunes and now I realize that as I began to listen podcasts in the fall of 2005 I can be considered as kind of a veteran of the podcast movement, if such a thing exists somewhere :-)) The first couple podcasts I began to listen to and which I listen to today are: TWIS - <a href="http://itunes.apple.com/ca/podcast/this-week-in-science-the-kickass/id73330501" target="_blank">This Week In Science</a> and later <a href="http://itunes.apple.com/ca/podcast/the-tech-night-owl-live/id75128690" target="_blank">TechNightOwl</a>. I have to tell you that there is no way, given the amount of spare time I have daily, I could get the information my brain was starving for without these two sources! <br /> <br />\r\n\r\nSo folks, dig into iTunes, search for stuff you''re passionate about, put it on your iPod, iPhone, or anything you can sync with iTunes  and enjoy learning! <br /> <br />\r\n\r\n\r\nArtyom Diogtev, <br />\r\nNew Media Manager', '', 1, 9, 0, 23, '2010-05-20 10:19:10', 115, 'Artyom Dogtiev', '2010-05-27 17:23:53', 115, 0, '0000-00-00 00:00:00', '2010-05-20 10:19:10', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 14, 0, 11, '', '', 0, 1366, ''),
(198, 'Tablet War: Apple vs. Google vs...?', '', '', 'Congratulations, a new front on the mobile war has been officially opened! Its name is Tablet Computer. Right after Apple announced its iPad, back in January of this year, many consumer electronics analysts'' prediction was - by the end of this year we''re gonna see at least 50 devices similar to iPad and it''s no brainer the majority of them will be run on Android.\r\n<br /><br />\r\n\r\nIn many ways it looks like a logical continuation to the war between iPhone and Android. Well, when I say war I mean it''s a war for companies, who do design, manufacture and market their devices; end user is happy to choose whatever he feels will work for him. \r\n<br /><br />\r\nSpeaking of what will work and what won''t. A tablet computer is not a brand new conception, back in 1998 Apple debuted with their famous Newton but at that time Steve Job''s verdict was - no, the thing isn''t gonna fly, btw it was a time when Steve got back to the company and became its CEO. Well, 12 years later Apple hit the market with iPad, for the last decade there were and still are many tablet computers but their application is restricted to specific tasks and they aren''t meant to be used by people in a way as we see people use iPad now. <br /><br />\r\n\r\nIt looks like all companies, which now launch their iPad-like devices, were waiting for Apple to come up with their 2010 version of a tablet computer and, because Apple has a long record of releasing successful products, as soon as a tablet will be presented, to copy its conception, alter it enough to not go to trial for copyright infringement and throw it to the market to get their share. Ok, so how we''re doing so far? Let me outline the major opponents below: <br /><br />\r\n\r\n\r\n<p>\r\n<h3>iPad</h3>Design - <a href="http://apple.com/ipad" target="_blank">Apple, Inc</a>, OS - iPhone OS 3.2<br />\r\n<img alt="iPad" width="220" height="123" src="http://www.intersog.com/images/blogimg/ipad_for_tabler_pc_war_tn.jpg">\r\n</p>\r\n\r\n<p>\r\n<h3>HP Slate</h3>Design - <a href="http://hp.com" target="_blank">HP</a>, OS - Windows 7<br />\r\n<img alt="HP Slate" width="220" height="144" src="http://www.intersog.com/images/blogimg/hp_slate_tablet_war_post_tn.jpg"></p>\r\n\r\n\r\n<p>\r\n<h3>WePad</h3>Design - <a href="http://www.latestsets.com/" target="_blank">Latestsets</a>, OS - Linux<br />\r\n<img alt="WePad" width="220" height="158" src="http://www.intersog.com/images/blogimg/wepads_tablet_war_post_tn.jpg"></p>\r\n\r\n<p>\r\n<h3> Archos 7</h3>Design - <a href="http://www.archos.com/" target="_blank">Archos</a>, OS - Android<br />\r\n<img alt="Archos 7" width="220" height="136" src="http://www.intersog.com/images/blogimg/archos_7_tablet_war_post_tn.jpg"></p>\r\n<p>\r\nAnd it''s just the beginning...<br /><br />\r\n\r\nVadim Chernega,<br />\r\nINTERSOG CEO</p>', '', 1, 9, 0, 23, '2010-05-21 08:39:52', 115, 'Vadim Chernega', '2010-05-21 11:03:32', 115, 0, '0000-00-00 00:00:00', '2010-05-21 08:39:52', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 24, 0, 10, '', '', 0, 1747, ''),
(199, 'Laptop for everybody', '', '', '<img alt="Laptop for everybody" width="250" height="182" src="http://www.intersog.com/images/blogimg/cherrypal-netbook_tn.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nFebruary 16, 2007Ã¢â‚¬Â¦  Forty of the brightest undergraduate entrepreneurs, from four universities, took a part in one of a kind competition hosted by Illinois Institute of Technology and sponsored by Motorola.  Playing field? Ã¢â‚¬â€œ Downtown Chicago.  Focus? Ã¢â‚¬â€œ Creation of a new concept Motorola phone. <br /> <br />\r\n\r\nOne of DePaul UniversityÃ¢â‚¬â„¢s teams came in fifth, proposing a concept/idea that three years later will be picked up by some. <br /> <br />\r\n\r\nMay 12, 2010Ã¢â‚¬Â¦  <a href="http://Gdgt.com" target="_blank">Gdgt.com</a> is on a live tour.  A massive crowd of geeks and geek wannabes await by Gallery 233, downtown Chicago, for the start of the event.   Some interested in free merchandise, some in free booze, but all united with passion for technology.  An impressive list of sponsors onboard showcasing their products: KIN, Windows Phone 7 Series, HTC, Logitech, Boxee, Cherrypal, Nero,Drobo and moreÃ¢â‚¬Â¦ <br /> <br />\r\n\r\n<a href="http://cherrypal.com/" target="_blank">Cherrypal</a> is what caught my attention.  Max Seybold, the founder of Cherrypal, became interested in finding a way to bridge the Ã¢â‚¬Å“digital divideÃ¢â‚¬Â. He believed that everyone should have access to technology and the benefits of the Internet, not just those who can afford to spend $500 or more on a new computer.   The idea is simple; the business plan is brilliant.  Focus on emerging markets as well as third world countries and you get a very precise target market that covers the mammoth part of the WorldÃ¢â‚¬â„¢s population.  This market is often overlooked, yet it provides arguably the largest buying power.  The demands of this target market are much less sophisticated allowing for major development cost savings.  Focusing on features that most people needed - check emails, listen to music, surf the web, watch the occasional video and use an office suite - a laptop was created that used ninety percent less energy and eighty percent fewer parts, thus making it affordable to the target market. <br /> <br />\r\n\r\nThis is a very Ã¢â‚¬Å“responsibleÃ¢â‚¬Â concept answering to human rights and environmental safety.  Information is power, and internet is the easiest way to information.  Why not make the World a better place, while making a fortune?.. <br /> <br />\r\n\r\nCherrypalÃ¢â‚¬â„¢s first product, C110, received 2.5 million hits on the website the first day leading to a complete sellout.  The latest CherrypalÃ¢â‚¬â„¢s product is called Africa, it is a 7Ã¢â‚¬Â mini laptop that costs $99. <br /> <br />\r\n\r\nI am proud to have been a part of DePaul UniversityÃ¢â‚¬â„¢s team that have clearly put this concept forward. <br /> <br />\r\n\r\nIntersog was recently contacted by a British company, will keep them anonymous at this stage, to partner on a similar venture.  We are asked to take charge of developing an interface for the new device.  Check back to stay in the know about the unfolding of this probable project.  <br /> <br />\r\n\r\nYuriy Nekrasov, <br />\r\nSocial Media Specialist \r\n', '', 1, 9, 0, 23, '2010-05-25 15:48:19', 115, 'Yuriy Nekrasov', '2010-05-25 16:16:29', 115, 0, '0000-00-00 00:00:00', '2010-05-25 15:48:19', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 8, 0, 9, '', '', 0, 1861, ''),
(200, 'Google vs Opera: Opera strikes back', '', '', '<img alt="Opera browser" width="100" height="88" src="http://www.intersog.com/images/blogimg/opera_tn.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\n<img alt="Chrome browser" width="100" height="71" src="http://www.intersog.com/images/blogimg/chrome_tn.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nAs one probably knows, I am an old Opera browser fan.<br /><br />\r\n\r\nMany times Google PR staff  ignores the best browser ever Opera ,  probably with the intention of  promoting Chome.<br />\r\n\r\nYou can see <a href="http://googleenterprise.blogspot.com/2010/01/modern-browsers-for-modern-applications.html" target="_blank">http://googleenterprise.blogspot.com/2010/01/modern-browsers-for-modern-applications.html</a> for example . Here Google skips Opera in a list  of "modern browsers".<br /><br />\r\n\r\nBut this time Opera strikes back in a very smart and funny response to this Google ad: <br /><br />\r\n\r\n<a href="http://www.youtube.com/watch?v=nCgQDjiotG0" target="_blank">http://www.youtube.com/watch?v=nCgQDjiotG0</a><br /><br />\r\n\r\nYou can see the response here .<br /><br />\r\n\r\n<a href="http://www.youtube.com/watch?v=zaT7thTxyq8" target="_blank"> http://www.youtube.com/watch?v=zaT7thTxyq8</a><br /><br />\r\n\r\nLow tech, but funny.<br /><br />\r\n\r\nSergey Rogachov CTO', '', 1, 9, 0, 23, '2010-06-03 10:58:44', 115, 'Sergey Rogachov', '2010-06-03 11:18:04', 115, 0, '0000-00-00 00:00:00', '2010-06-03 10:58:44', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 9, 0, 8, '', '', 0, 1802, ''),
(201, 'Google, do not be evil.', '', '', '<img alt="Don''t Be Evil" width="180" height="92" src="http://www.intersog.com/images/blogimg/dont_be_evil.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nAs it turns out  Google Apps  infrastructure has a BUG that  is causing  emails delay. The only  available suggestions is to set up  spf record. But this is not  going  to  solve it .<br /><br />\r\n\r\nAll delayed messages have the following  in email headers,  ip  is different each  time ,  though.<br />\r\n<i>\r\nReceived-SPF: error (google.com: error in processing during lookup of xxx@intersog.com: DNS timeout) client-ip=74.125.82.181;\r\nAuthentication-Results: mx.google.com; spf=temperror (google.com: error in processing during lookup of xxx@intersog.com: DNS timeout) smtp.mail=xxx@intersog.com\r\n</i>\r\n<br /><br />\r\nThe Ugliest  thing   there is no official  reaction from google,  yes i  know  the service is free ,  this problem is there  for months  already .<br /><br />\r\n\r\n<a href="http://www.google.com/search?q=google+apps+mail+delay" target="_blank">http://www.google.com/search?q=google+apps+mail+delay</a><br /><br />\r\n\r\nGoogle, please please do not be evil!<br /><br />\r\n\r\nSergey Rogachov CTO.', '', 1, 9, 0, 23, '2010-06-29 10:09:00', 115, 'Sergey Rogachov', '2010-06-29 10:20:33', 115, 0, '0000-00-00 00:00:00', '2010-06-29 10:08:23', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 11, 0, 7, '', '', 0, 2074, ''),
(202, 'Tester Day', '', '', '<img alt="Tester Day" width="200" height="146" src="http://www.intersog.com/images/blogimg/bug.jpg" style="forpost: right; float: right; margin-bottom: 1em; margin-left: 1em;">\r\n\r\nOn September 9, 1947 scientists from Harvard University were testing one of the first computing machines, the Mark II Aiken Relay Calculator, at their Computation Laboratory. During one of these tests they found a moth inside the machine which had become stuck in  one of it''s relays. They were obligated to record this incident and came up with a proper word on the spot to describe their measures for removing the moth - debugging, literally meaning ''to get rid of a bug''. Ever since that incident this term has been used to describe the process of identifying and removing bugs from computers, and subsequently a completely new profession arose to meet this task - the tester. <br /><br />\r\n\r\nA computer software tester is a specialist that launches a series of diagnostics to ensure the quality and integrity of software or information system. This profession requires a broad scope of skills - including the ability to develop software. Quite often this position requires an individual to have experience working with databases, SQL, script languages, as well as operational systems administration.<br /><br />\r\n\r\nFurthermore two of the most important job requirements for a tester are to have the ability to think like an end-user -- the one who will use the software which they are testing -- and from other side to have the ability to analyze input data and subsequent from a developer''s perspective. In 1945 that moth was glued into the pages a technical journal with a note reading "First actual case of bug being found" and later in 1947 it was passed along to the Smithsonian National Museum of American History where it remains to this day, the first and only literal example of the countless bugs that were to harass the integrity of computing systems from then onwards.<br /><br />\r\n\r\nIntersog QA Team', '', 1, 9, 0, 23, '2010-09-09 04:05:21', 115, 'QA Team', '2010-09-16 04:53:46', 115, 0, '0000-00-00 00:00:00', '2010-09-09 04:44:22', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 8, 0, 6, '', '', 0, 1120, ''),
(207, 'iOS app for RaiseTheVillage project', '', '', '<img alt="RaiseTheVillage" width="240" height="180" src="http://www.intersog.com/images/blogimg/rtv_full_logo.png" style="forpost: right; float: left; margin-bottom: 1em; margin-right: 2em;">\r\n\r\nWe couldn''t just let it pass without noticing and decided to share with a feedback we''ve got from New Charity Era orgranization. We worked really hard to make this project possible and really delighted to announce that the iOS app we''ve developed for this project is actually one step away from being available on the Apple''s iTunes App Store. And so soon anybody will be able to participate in New Charity Era initiative to help African kids from poor villages!<br /><br />\r\n\r\n<i>"...On behalf of the New Charity Era team, I want to give a great thank you to all of you! We greatly appreciate all of your help and dedication over the past months to bring Raise the Village to a state of submission! <br /><br />  \r\n\r\nWe will keep you informed with our strategic plans in the future, and we are already planning many future updates. The app has come out great and we are impressed with all of your work. <br /><br />\r\n\r\nThank you again!..."</i>\r\n<br />\r\nC.M.<br />\r\nNew Charity Era, L3C<br />\r\nRaise the Village - iPhone App (Coming Soon)<br />\r\n<a href="http://www.RaiseTheVillage.com">www.RaiseTheVillage.com</a>', '', 1, 9, 0, 23, '2010-11-23 10:22:32', 115, 'Artyom Dogtiev', '2010-11-24 06:14:10', 115, 0, '0000-00-00 00:00:00', '2010-11-23 07:13:10', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 18, 0, 5, '', '', 0, 1077, ''),
(208, 'Sun Weather Forecast', '', '', '<img alt="Sun Flares" width="120" height="120" src="http://www.intersog.com/images/blogimg/sun_flares_sm.jpg" style="forpost: right; float: left; margin-bottom: 1em; margin-right: 2em;">\r\n\r\nHow often do you check a local forecast on TV, your computer, or your phone? I''m betting that at least once a day most of us check to see if we should take an umbrella out with us or if sunglasses and shorts might be the better way to go. This said, we aught to remember that there is other form of weather we should pay attention to as well, the weather of the immediate solar cosmos surrounding us. In a nut shell, when we discuss ''space weather'' we are referring to the Sun''s electromagnetic disturbances and furthermore how these fluctuations - shifting the velocity and magnitude of both radiation as well as electromagnetic waves spilling outwards from our sun -  affect changes within the environment of our own planet and influence our daily lives. <br />\r\n<br />\r\nDisturbances on the surface of the sun are caused by solar flares and coronal mass ejections (CMEs) that naturally occur due to electromagnetic coils randomly yet violently unfurling as well as the eruption of the sun''s mantle due to extremely large explosions fueled by unstable nuclear fusion originating at the sun''s core. The clouds of fast moving radiation and magnetism these disturbances throw outwards - solar storms - are sometimes directed at the earth and upon reaching our planet arrive with enough force to impact high frequency (HF) radio communications, the accuracy of GPS navigation systems, power line transmissions, cell phones, and satellite orbits.\r\n\r\n<br /><br />\r\nEarlier this year we reported on the Space WX v1.4 iPhone app release we developed for the joint project of the Utah Sate University''s Space Weather USTAR and Space Environment Technologies, LLC. The App serves as a platform upon which 16 diverse organizations collaborate to integrate 112 real-time products using a distributed, operational network. \r\n<br /><br />\r\nThe  version 1.6  we''ve finished developing just a couple days ago has brought a major upgrade to the app. It brings:\r\n\r\n<ol>\r\n<li>70 new images, which comprehensively encompasses a wide range of space weather phenomena. Of particular note are the stunning new solar images from the new Solar Dynamics Observatory (SDO) satellite;</li>\r\n<li>The ability to bookmark individual real-time images provides quick navigation to your favorites;</li>\r\n<li>New menu icons help in finding images from a variety of institutions. </li>\r\n<li>This version has been tested on the iPod/iTouch, iPhone, and iPad.</li>\r\n</ol>\r\n\r\nYou can read more about what stands behind this app by visiting  the Utah Sate University''s Space Weather USTAR initiative website - <a href="http://www.innovationutah.com" target="_blank">www.innovationutah.com</a> and Space Environment Technologies, LLC <a href="http://www.spacewx.com" target="_blank">www.spacewx.com</a>\r\n\r\nWithin a week or so it will be available on the iTunes App Store and so feel free to download the app from iTunes to know what you should expect from this star we all call our Sun :-) - <a href="http://itunes.apple.com/us/app/space-wx/id328346172?mt=8" target="_blank">http://itunes.apple.com/us/app/space-wx/id328346172?mt=8</a><br /><br />\r\n\r\nArtyom Diogtev, <br />\r\nNew Media Manager', '', 1, 9, 0, 23, '2010-12-03 06:06:06', 115, 'Artyom Dogtiev', '2010-12-03 06:22:23', 115, 0, '0000-00-00 00:00:00', '2010-12-03 06:03:25', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 9, 0, 4, '', '', 0, 924, ''),
(209, 'RaiseTheVillage gets great media coverage!', '', '', '<img alt="RaiseTheVillage" width="245" height="164" src="http://www.intersog.com/images/blogimg/file.png" style="forpost: right; float: left; margin-bottom: 1em; margin-right: 2em;">\r\n\r\nAs it''s well known that any project and, especially a non-profit one, always strives for media attention to make people aware of its existence, to spread the word as much as possible and eventually to reach the right people who will help to move a project forward and let it prosper. \r\n<br /><br />\r\nWe are glad to report that RaiseTheVillage project has been mentioned by AOL editor Joe Osborne - <a href="http://blog.games.com/2011/01/06/games-coms-predictions-2011/" target="_blank">http://blog.games.com/2011/01/06/games-coms-predictions-2011/</a> It''s really delightful to read good words that reward all efforts have been put into the project and see how good your intentions resonate with people who spread the news about your project on such big and reputable media resource as AOL is. And so we really want to thank the AOL''s editorial staff for giving the project such a great exposure and support!\r\n<br /><br />\r\nBut that''s not it - the project has been covered in many other media outlets and if you want to check them all feel free to visit - <a href="http://www.raisethevillage.com/in-the-media.aspx" target="_blank">http://www.raisethevillage.com/in-the-media.aspx</a>\r\nTo know more about the project visit http://www.raisethevillage.com\r\nTo download the iPhone app, which works perfectly well on both iPod Touch and iPad as well visit - <a href="http://itunes.apple.com/us/app/raise-the-village/id398463247?mt=8" target="_blank">http://itunes.apple.com/us/app/raise-the-village/id398463247?mt=8</a>\r\n<br /><br />\r\nDevelopment Team', '', 1, 9, 0, 23, '2011-02-18 09:32:57', 62, 'Artyom Diogtev', '2011-02-18 09:59:33', 62, 0, '0000-00-00 00:00:00', '2011-01-13 09:26:55', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 8, 0, 3, '', '', 0, 184, ''),
(210, 'Windows Phone Marketplace', '', '', '<img alt="RaiseTheVillage" width="131" height="117" src="http://www.intersog.com/images/blogimg/windows_marketplace_for_mobile_icon.png" style="forpost: right; float: left; margin-bottom: 1em; margin-right: 2em;">\r\n\r\nWe, at INTERSOG, strongly believe that diversity is one of key elements to success in the mobile application/product development arena. In the last few years we have achieved a great amount of success with releasing iOS applications on the Apple''s iTunes App Store, developing and releasing applications for Android Marketplace, and for BlackBerry App World. This February we are proud to announce the addition of the Microsoft Windows Phone MarketPlace to the mix, with several ports of our existing products including Leaning-To-Go applications, Psych Test, Psychology, and VIN Decoder. <br /><br />\r\n\r\nQuite frankly, at this point it is impossible to predict this new market, but according to many analysts, Windows Phone Marketplace will meet a good deal of attention from businesses, which do rely on software solutions from Microsoft and so naturally will be interested in this new mobile platform. We are doing everything in our power to deliver the same great experience to customers as we have been delivering for iOS, Android, and BlackBerry device users!\r\n<br /><br />\r\n\r\nDevelopment Team', '', 1, 9, 0, 23, '2011-02-28 13:38:59', 62, '', '2011-03-01 02:21:02', 62, 0, '0000-00-00 00:00:00', '2011-02-15 13:38:23', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 10, 0, 2, '', '', 0, 17, ''),
(217, 'iPhone & Android developers conference', '', '', '<img alt="iOS development" width="100" height="63" src="http://www.intersog.com/images/blogimg/ios_icon.png" style="forpost: right; float: left; margin-bottom: 1em; margin-right: 2em;">\r\nInternational company INTERSOG invites Objective C developers, as well as anyone who has certain interest and experience in developing iPhone and Android apps to attend a conference that will take place on March 19, 2011 in Nikolaev, Ukraine.<br /><br />\r\n\r\nThis event will provide a unique opportunity to learn from author presentations, addressing various aspects of mobile applications/games development. You will hear presentations dedicated to programming, testing, usability and other aspects of our daily work.<br /><br />\r\n<img alt="Android Development" width="100" height="100" src="http://www.intersog.com/images/blogimg/android_icon.png" style="forpost: left; float: right; margin-bottom: 1em; margin-right: 2em;">\r\n\r\nThis conference will focus not only on developers but on analysts, beta testers, managers, as well as everyone interested and involved in mobile apps/games marketing.<br /><br />\r\n\r\nSpecifically for this conference we are inviting the best specialists, who will gladly share their experience with you, including our American and Canadian colleagues. <br /><br />\r\n\r\nAside from presentations you will be able to share your experience during coffee breaks in a friendly, informal environment. <br /><br />\r\n\r\nThis conference will benefit anyone who considers their own professional growth as an important factor and cares about an industry progress as a whole.<br /><br />\r\n\r\nCome and bring anyone interested in iPhone and Android app development.<br /><br />\r\n\r\nDate and time - March 19, 2011 at 11:00am<br />\r\nPlace - Nikolaev, Ukraine.  Venu to be determined<br />\r\nThe conference program will be available in the near future.<br />\r\nAdmission - Free.<br />\r\nLinkedin event <a href="http://events.linkedin.com/iPhone/pub/574448" target="_blank">http://events.linkedin.com/iPhone/pub/574448</a><br />\r\nFacebook group \r\n<a href="http://www.facebook.com/home.php?sk=group_155942534459149&ap=1" target="_blank">http://www.facebook.com/home.php?sk=group_155942534459149&ap=1</a>', '', 1, 9, 0, 23, '2011-03-01 02:25:46', 62, '', '2011-03-01 03:04:25', 62, 62, '2011-04-17 13:24:40', '2011-03-01 02:21:10', '0000-00-00 00:00:00', '', '', 'pageclass_sfx=\nback_button=\nitem_title=1\nlink_titles=\nintrotext=1\nsection=0\nsection_link=0\ncategory=0\ncategory_link=0\nrating=\nauthor=\ncreatedate=\nmodifydate=\npdf=\nprint=\nemail=\nkeyref=\ndocbook_type=', 12, 0, 1, '', '', 0, 24, ''),
(218, 'LTG', 'ltg', '', '<p> </p>\r\n<div style="tab-interval:.8333in">\r\n<div class="O"><img src="images/stories/portfolio/ltg.png" border="0" /></div>\r\n<div class="O"><span style="mso-hansi-font-family:Arial;font-size: 14pt" lang="EN-US"><strong>Learning to Go </strong></span></div>\r\n<div class="O"><span style="mso-hansi-font-family:Arial;font-size: 14pt" lang="EN-US"><strong> </strong></span></div>\r\n<div class="O" style="mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:12pt" lang="EN-GB">Learning To Go framework is an innovation educational platform for the mobile market and fully exploits the latest smart phone </span><span style="font-size:12pt" lang="EN-GB">technology providing a complete integrated and flexible learning experience. </span></div>\r\n<div class="O" style="mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:12pt" lang="EN-GB"> </span></div>\r\n<div class="O" style="mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:12pt" lang="EN-GB">Features: </span></div>\r\n<div class="O1" style="mso-margin-left-alt:360;mso-text-indent-alt:360; mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:67%"><span style="mso-special-format: bullet; position: absolute; left: -.6%;">•</span></span><span style="font-size:12pt" lang="EN-GB">Full course text divided by chapter </span></div>\r\n<div class="O1" style="mso-margin-left-alt:360;mso-text-indent-alt:360; mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:67%"><span style="mso-special-format: bullet; position: absolute; left: -.6%;">•</span></span><span style="font-size:12pt" lang="EN-GB">Interactive flashcards for subject review </span></div>\r\n<div class="O1" style="mso-margin-left-alt:360;mso-text-indent-alt:360; mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:67%"><span style="mso-special-format: bullet; position: absolute; left: -.6%;">•</span></span><span style="font-size:12pt" lang="EN-GB">Comprehensive chapter-level tests </span></div>\r\n<div class="O1" style="mso-margin-left-alt:360;mso-text-indent-alt:360; mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:67%"><span style="mso-special-format: bullet; position: absolute; left: -.6%;">•</span></span><span style="font-size:12pt" lang="EN-GB">Explanations of right and wrong answers </span></div>\r\n<div class="O1" style="mso-margin-left-alt:360;mso-text-indent-alt:360; mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:67%"><span style="mso-special-format: bullet; position: absolute; left: -.6%;">•</span></span><span style="font-size:12pt" lang="EN-GB">Charts, Graphs, Examples </span></div>\r\n<div class="O" style="mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:12pt" lang="EN-GB"> </span></div>\r\n<div class="O" style="mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:12pt" lang="EN-GB">Learning-To-Go is an innovative educational platform for the mobile market and fully exploits the latest smart phone technology to </span><span style="font-size:12pt" lang="EN-GB">create a complete, integrated and flexible learning experience. Combining a full-text course book, tools such as flashcards to </span><span style="font-size:12pt" lang="EN-GB">review key points and interactive tests, Learning-To-Go brings the power of the classroom to the palm of your hand. </span></div>\r\n<div class="O" style="mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:12pt" lang="EN-GB"> </span></div>\r\n<div class="O" style="mso-char-wrap:1;mso-kinsoku-overflow:1"><span style="font-size:12pt" lang="EN-GB">The full-text course books can be bookmarked at any point, so users never lose their spot when stopping or resuming </span><span style="font-size:12pt" lang="EN-GB">study.  Interactive flashcards allow for a quick and useful way to review.  Comprehensive, chapter-level self-tests come complete </span><span style="font-size:12pt" lang="EN-GB">with explanations of correct and incorrect and answers and allows users to save their results to track their progress. </span></div>\r\n</div>\r\n<p> </p>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">All of which can be supplemented further with the addition of fully searchable business-specific dictionaries and glossaries. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"><br /> </span><span style="font-size: 12pt;" lang="EN-GB">The in-depth coverage and full-function features are available in every Learning To-Go application, providing an ideal educational </span><span style="font-size: 12pt;" lang="EN-GB">system for a wide range of individuals and organizations. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Adaptation of your content for multiple mobile platforms </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n</div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 16px;"><span style="font-size: 12px;"><span style="font-size: 12pt;" lang="EN-GB">The Learning To-Go Educational Platform has been optimized for the iPhone, Android, Blackberry and iPad platforms. Thus, </span><span style="font-size: 12pt;" lang="EN-GB">making your content available for people using all kinds of mobile devices. </span></span> </span></div>\r\n</div>\r\n<p> </p>', '', 1, 8, 0, 6, '2011-04-18 14:57:50', 62, '', '2011-04-18 15:07:15', 62, 0, '0000-00-00 00:00:00', '2011-04-18 14:57:50', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 2, 0, 7, '', '', 0, 1, 'robots=\nauthor='),
(219, 'Combobook', 'combobook', '', '<p>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><img src="images/stories/portfolio/cmb.jpg" border="0" /></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;">ComboBook is a new revolutionary system for self-education developed by ComboApp. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;">\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;">ComboBook is a completely new system which converts ordinary book content into a complete Educational System. Our system </span><span style="font-size: 12pt;">transforms authors content into an interactive Learning Application. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;"><br /> </span><span style="font-size: 12pt;">We are seeking educational literature such as textbooks, manuals, scientific studies, thesis etc. as the basis for this material. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;"><br /> </span><span style="font-size: 12pt;">\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;">Our learning system utilizes innovative methods which are suitable for self-education. The problem is that many authors of </span><span style="font-size: 12pt;">education materials very rarely create materials with flashcards, tests, which reinforce the learning process. That is why we </span><span style="font-size: 12pt;">decided to develop a new system which would not require content with preexisting flashcards or tests. Our system analyzes the </span><span style="font-size: 12pt;">content, generating questions for students to aid in self-assessment. The primary aim of such questions are not simply to check </span><span style="font-size: 12pt;">whether a student learned the material. The MAIN AIM OF THIS SYSTEM IS TO MAKE THE STUDENT THINK about what they </span><span style="font-size: 12pt;">have read, go deep into the material and and re-read material again. The main focus of this system is to independently analyze </span><span style="font-size: 12pt;">the text and make up questions on the basis of EVERY text without the editor''s assistance. </span></div>\r\n</div>\r\n</span></div>\r\n</div>\r\n</span></div>\r\n</div>\r\n</p>', '', 1, 8, 0, 6, '2011-04-18 15:08:29', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 15:08:29', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 6, '', '', 0, 1, 'robots=\nauthor='),
(220, 'Storm Chaser (Android)', 'storm-chaser-android', '', '<p>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><img src="images/stories/portfolio/storm_chaser1.png" border="0" /></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-US">Storm Chaser is the application for storm chasers and weather enthusiasts that helps to find relevant and recent information for </span><span style="font-size: 12pt;" lang="EN-US">selected region. Application is using special overlay with important weather factors such as Storm Tracking, Mesocyclone </span><span style="font-size: 12pt;" lang="EN-US">Algorithm and Tornado Vortex Signature that are keys for detection of major and dangerous weather phenomenons. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-US">After application launch user is able to determine factors hi is interested in (such as Relative Velocity, Base Reflectivity and Radial </span><span style="font-size: 12pt;" lang="EN-US">velocity) which will appear as the overlay, Instant<span style="mso-spacerun: yes;"> </span>location detection with help of GPS functionality and compass icon helps user </span><span style="font-size: 12pt;" lang="EN-US">quickly get information about the region. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-US">Application has implemented list of radars covering all the territory of United Stated and respected source </span><span style="font-size: 12pt;" lang="EN-US">(</span><span style="font-size: 12pt;" lang="EN-US"><a href="http://www.weather.gov/alerts/" target="_parent">http://www.weather.gov/alerts/</a></span><span style="font-size: 12pt;" lang="EN-US">) to show information for the weather warnings. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-US">Also there is a list of features that make application unique. This is animation option that enable user to see most recent weather </span><span style="font-size: 12pt;" lang="EN-US">factor changes animated so if something important is going on user will get instant visual proof. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-US">Device rotation will change map interactively and will correctly show the directions (south, west, north, east). Application works </span><span style="font-size: 12pt;" lang="EN-US">with Google Maps API and contain all its standard features. </span></div>\r\n</div>\r\n</p>', '', 1, 8, 0, 6, '2011-04-18 15:11:55', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 15:11:55', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 5, '', '', 0, 1, 'robots=\nauthor=');
INSERT INTO `jos_content` (`id`, `title`, `alias`, `title_alias`, `introtext`, `fulltext`, `state`, `sectionid`, `mask`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `publish_up`, `publish_down`, `images`, `urls`, `attribs`, `version`, `parentid`, `ordering`, `metakey`, `metadesc`, `access`, `hits`, `metadata`) VALUES
(221, 'Enneagram', 'enneagram', '', '<p>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div></div>\r\n<div><img src="images/stories/portfolio/enneagram.png" border="0" /></div>\r\n<div></div>\r\n<div><span style="mso-hansi-font-family: Arial; font-size: 12pt;" lang="EN-US"><strong>Personality Test </strong></span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">The Enneagram Personality Full Test is a validated test created by The Enneagram Institute which is dedicated to the Work of </span><span style="font-size: 12pt;" lang="EN-GB">human liberation and transformation. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">One of the most powerful tools for understanding ourselves and others is the </span><span style="font-size: 12pt;" lang="EN-GB"><a href="http://www.enneagraminstitute.com/intro.asp" target="_parent">Enneagram</a></span><span style="font-size: 12pt;" lang="EN-GB">, an ancient symbol of unity and diversity, </span><span style="font-size: 12pt;" lang="EN-GB">change and transformation. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Over 300,000 Enneagram Personality Full Tests have already been sold around the world in Chinese, Dutch, English, French, </span><span style="font-size: 12pt;" lang="EN-GB">German, Korean, Polish, Russian, Spanish, and Swedish. It was chosen by </span><span style="font-size: 12pt;" lang="EN-GB"><em>Time</em></span><span style="font-size: 12pt;" lang="EN-GB"> magazine as one of the top online personality </span><span style="font-size: 12pt;" lang="EN-GB">tests. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Now, the Enneagram Personality Full Test is available on your iPhone and iPod Touch (2nd. gen.) to give you the power and </span><span style="font-size: 12pt;" lang="EN-GB">convenience to gain awareness of family members, clients, business colleagues, and yourself. For HR professionals, the test is a </span><span style="font-size: 12pt;" lang="EN-GB">valuable and accurate way to identify personality traits in existing employees in order to work with</span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 16px;">them more effectively.</span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">The Enneagram recognizes 9 distinct personality types, the mix of which varies in each individual. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">In most cases, the Enneagram Personality Full Test reveals the user’s dominant personality type, as well as indicates the relative </span><span style="font-size: 12pt;" lang="EN-GB">strength of the other eight personality types in their psychological makeup. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Results include type descriptions, structural patterns, as well as relationship and growth suggestions for each type. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Easily completed in about 40 minutes, the Enneagram Personality Full Test is a convenient tool for individuals as well as business </span><span style="font-size: 12pt;" lang="EN-GB">and helping professionals, to increase insight into themselves or their clients. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">People around the world have found this test exceptionally insightful and useful in many practical applications. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Check it out on iTunes: </span><span style="font-size: 12pt;" lang="EN-GB"><a href="http://itunes.apple.com/us/app/enneagram-personality-full/id365310605?mt=8" target="_parent">AppStore</a></span><span style="font-size: 14pt;" lang="EN-US"> </span></div>\r\n</div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 16px;"> </span></div>\r\n</div>\r\n</p>', '', 1, 8, 0, 6, '2011-04-18 15:16:58', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 15:16:58', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 4, '', '', 0, 0, 'robots=\nauthor='),
(222, '“Gesund & Fit” ', 'gesund-a-fit-', '', '<p>\r\n<div class="O">\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><img src="images/stories/portfolio/gesund.png" border="0" /></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-US"><strong>Medicine Application </strong></span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-US"><strong>(iPhone, iPad) </strong></span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-US"><strong>\r\n<div class="O">\r\n<div style="mso-margin-left-alt: 336; mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-US">This application contains medicine info about symptoms, diseases and treatments. Users can view it by 3D </span><span style="font-size: 14pt;" lang="EN-US">human model or by selected chapters, by various areas or just a-z view. </span></div>\r\n<div style="mso-margin-left-alt: 336; mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-US"> </span></div>\r\n<div style="mso-margin-left-alt: 336; mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-US">Through application users can run tests and save results history. It helps to monitor your health and to </span><span style="font-size: 14pt;" lang="EN-US">be fit. You can find many helpful articles about sports, m</span><span style="font-size: 14pt;" lang="EN">edical supplies</span><span style="font-size: 14pt;"> </span><span style="font-size: 14pt;" lang="EN-US">diets, etc. </span></div>\r\n<div style="mso-line-spacing: &quot;100 20 0&quot;; mso-margin-left-alt: 336; mso-char-wrap: 1; mso-kinsoku-overflow: 1;"></div>\r\n<div style="mso-line-spacing: &quot;100 20 0&quot;; mso-margin-left-alt: 336; mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;">\r\n<div class="O">\r\n<div style="mso-line-spacing: &quot;100 50 0&quot;; mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-US">Also “Gesund &amp; Fit” maintains German medicine service SDK. With this service, you can find hospitals departments in your region </span><span style="font-size: 12pt;" lang="EN-US">using the Google Map, order a medical insurance certificates and other. </span></div>\r\n</div>\r\n</span></div>\r\n</div>\r\n</strong></span></div>\r\n</div>\r\n</p>', '', 1, 8, 0, 6, '2011-04-18 15:21:26', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 15:21:26', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 3, '', '', 0, 0, 'robots=\nauthor='),
(223, 'Toodalu', 'toodalu', '', '<p>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div><img src="images/stories/portfolio/toodalu.jpg" border="0" /></div>\r\n<div></div>\r\n<div><span style="mso-hansi-font-family: Arial; font-size: 14pt;" lang="EN-US"><strong>What to do in your area </strong></span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 14pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Toodalu is the Social Network project which include iPhone application, CMS and web-site. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Find your friends and the most hopping places in town. Toodalu creates a real time map of the most populated bars, restaurants </span><span style="font-size: 12pt;" lang="EN-GB">and relevant locations of our users and your friends. No need to text or call to see what’s going on. Toodalu’s map places pins to </span><span style="font-size: 12pt;" lang="EN-GB">mark your friends locations. When you go out, with the touch of a button you can “toodal” your location to all of them.<br /> </span><span style="font-size: 12pt;" lang="EN-GB"><br /> </span><span style="font-size: 12pt;" lang="EN-GB">We give you the power of selecting where you are by providing a list of the nearest bars, restaurants or gathering spots. The </span><span style="font-size: 12pt;" lang="EN-GB">location you select is what your friends will see, and only your friends will see it. You control both your location and who sees it. </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Find out more: </span><span style="font-size: 12pt;" lang="EN-GB"><a href="http://www.toodalu.com/user/index" target="_parent">Watch the Video</a></span><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;" lang="EN-GB">Check it out on iTunes: </span><span style="font-size: 12pt;" lang="EN-GB"><a href="http://itunes.apple.com/us/app/toodalu/id347952454?mt=8" target="_parent">AppStore</a></span><span style="font-size: 12pt;" lang="EN-US"> </span></div>\r\n</div>\r\n</p>', '', 1, 8, 0, 6, '2011-04-18 15:24:11', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 15:24:11', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 2, '', '', 0, 0, 'robots=\nauthor='),
(224, 'iSpoil  (iPhone)', 'ispoil-iphone', '', '<p>\r\n<div class="O" style="tab-interval: .8333in;"></div>\r\n<div class="O" style="tab-interval: .8333in;"><img src="images/stories/portfolio/iSpoil.jpg" border="0" /></div>\r\n<div class="O" style="tab-interval: .8333in;"></div>\r\n<div class="O" style="tab-interval: .8333in;"><span style="font-size: 12pt;">Nobody likes to waste food. In these tough times, it does not make sense financially (or in any other way) to keep wasting food. </span><span style="font-size: 12pt;">Unfortunately, many of us end up doing that by buying things and not consuming them in time. Milk is not the only thing that can </span><span style="font-size: 12pt;">get spoiled. Keeping an eye on the things you have already bought and their expiration date can help you waste less food and </span><span style="font-size: 12pt;">save some money in the process. </span><span style="font-size: 12pt;" lang="EN-US"> </span></div>\r\n<div class="O" style="tab-interval: .8333in;">\r\n<div><span style="font-size: 12pt;">That’s what </span><span style="font-size: 12pt; text-shadow: auto;" lang="EN-US"><strong>iSpoil </strong></span><span style="font-size: 12pt;">is for. </span><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt;">iSpoil allows users to keep track of everything they have bought and their expiration dates. It alerts them when their food is about </span><span style="font-size: 12pt;">to reach its expiration date. </span><span style="font-size: 12pt;"><strong>iSpoil</strong></span><span style="font-size: 12pt;"> does not do the job automatically. In other words, there is no way to, let’s say, scan a food and </span><span style="font-size: 12pt;">capture its expiration date. Nevertheless, the app does make it easy to add, remove, and modify items. </span><span style="font-size: 12pt;" lang="EN-GB"> </span></div>\r\n<div style="mso-char-wrap: 1; mso-kinsoku-overflow: 1;"><span style="font-size: 12pt; text-shadow: auto;"><strong>iSpoil </strong></span><span style="font-size: 12pt;">supports shopping lists. It does let users search for foods by name. The interface is decent enough to save you some time </span><span style="font-size: 12pt;">when entering your food items. It would be nice to have a way to capture expiration dates using iPhone’s camera. iSpoil is based </span><span style="font-size: 12pt;">on a neat idea and can help you reduce food waste in your home</span><span style="font-size: 14pt;"> </span><span style="font-size: 14pt;" lang="EN-GB"> </span></div>\r\n</div>\r\n</p>', '', 1, 8, 0, 6, '2011-04-18 15:27:24', 62, '', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', '2011-04-18 15:27:24', '0000-00-00 00:00:00', '', '', 'show_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_vote=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nlanguage=\nkeyref=\nreadmore=', 1, 0, 1, '', '', 0, 0, 'robots=\nauthor=');

-- --------------------------------------------------------

--
-- Table structure for table `jos_content_frontpage`
--

CREATE TABLE IF NOT EXISTS `jos_content_frontpage` (
  `content_id` int(11) NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`content_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_content_frontpage`
--

INSERT INTO `jos_content_frontpage` (`content_id`, `ordering`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jos_content_rating`
--

CREATE TABLE IF NOT EXISTS `jos_content_rating` (
  `content_id` int(11) NOT NULL DEFAULT '0',
  `rating_sum` int(11) unsigned NOT NULL DEFAULT '0',
  `rating_count` int(11) unsigned NOT NULL DEFAULT '0',
  `lastip` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`content_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_content_rating`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_core_acl_aro`
--

CREATE TABLE IF NOT EXISTS `jos_core_acl_aro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_value` varchar(240) NOT NULL DEFAULT '0',
  `value` varchar(240) NOT NULL DEFAULT '',
  `order_value` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `hidden` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `jos_section_value_value_aro` (`section_value`(100),`value`(100)),
  KEY `jos_gacl_hidden_aro` (`hidden`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `jos_core_acl_aro`
--

INSERT INTO `jos_core_acl_aro` (`id`, `section_value`, `value`, `order_value`, `name`, `hidden`) VALUES
(10, 'users', '62', 0, 'Administrator', 0);

-- --------------------------------------------------------

--
-- Table structure for table `jos_core_acl_aro_groups`
--

CREATE TABLE IF NOT EXISTS `jos_core_acl_aro_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `lft` int(11) NOT NULL DEFAULT '0',
  `rgt` int(11) NOT NULL DEFAULT '0',
  `value` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `jos_gacl_parent_id_aro_groups` (`parent_id`),
  KEY `jos_gacl_lft_rgt_aro_groups` (`lft`,`rgt`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `jos_core_acl_aro_groups`
--

INSERT INTO `jos_core_acl_aro_groups` (`id`, `parent_id`, `name`, `lft`, `rgt`, `value`) VALUES
(17, 0, 'ROOT', 1, 22, 'ROOT'),
(28, 17, 'USERS', 2, 21, 'USERS'),
(29, 28, 'Public Frontend', 3, 12, 'Public Frontend'),
(18, 29, 'Registered', 4, 11, 'Registered'),
(19, 18, 'Author', 5, 10, 'Author'),
(20, 19, 'Editor', 6, 9, 'Editor'),
(21, 20, 'Publisher', 7, 8, 'Publisher'),
(30, 28, 'Public Backend', 13, 20, 'Public Backend'),
(23, 30, 'Manager', 14, 19, 'Manager'),
(24, 23, 'Administrator', 15, 18, 'Administrator'),
(25, 24, 'Super Administrator', 16, 17, 'Super Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `jos_core_acl_aro_map`
--

CREATE TABLE IF NOT EXISTS `jos_core_acl_aro_map` (
  `acl_id` int(11) NOT NULL DEFAULT '0',
  `section_value` varchar(230) NOT NULL DEFAULT '0',
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`acl_id`,`section_value`,`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_core_acl_aro_map`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_core_acl_aro_sections`
--

CREATE TABLE IF NOT EXISTS `jos_core_acl_aro_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(230) NOT NULL DEFAULT '',
  `order_value` int(11) NOT NULL DEFAULT '0',
  `name` varchar(230) NOT NULL DEFAULT '',
  `hidden` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `jos_gacl_value_aro_sections` (`value`),
  KEY `jos_gacl_hidden_aro_sections` (`hidden`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `jos_core_acl_aro_sections`
--

INSERT INTO `jos_core_acl_aro_sections` (`id`, `value`, `order_value`, `name`, `hidden`) VALUES
(10, 'users', 1, 'Users', 0);

-- --------------------------------------------------------

--
-- Table structure for table `jos_core_acl_groups_aro_map`
--

CREATE TABLE IF NOT EXISTS `jos_core_acl_groups_aro_map` (
  `group_id` int(11) NOT NULL DEFAULT '0',
  `section_value` varchar(240) NOT NULL DEFAULT '',
  `aro_id` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `group_id_aro_id_groups_aro_map` (`group_id`,`section_value`,`aro_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_core_acl_groups_aro_map`
--

INSERT INTO `jos_core_acl_groups_aro_map` (`group_id`, `section_value`, `aro_id`) VALUES
(25, '', 10);

-- --------------------------------------------------------

--
-- Table structure for table `jos_core_log_items`
--

CREATE TABLE IF NOT EXISTS `jos_core_log_items` (
  `time_stamp` date NOT NULL DEFAULT '0000-00-00',
  `item_table` varchar(50) NOT NULL DEFAULT '',
  `item_id` int(11) unsigned NOT NULL DEFAULT '0',
  `hits` int(11) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_core_log_items`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_core_log_searches`
--

CREATE TABLE IF NOT EXISTS `jos_core_log_searches` (
  `search_term` varchar(128) NOT NULL DEFAULT '',
  `hits` int(11) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_core_log_searches`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_groups`
--

CREATE TABLE IF NOT EXISTS `jos_groups` (
  `id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_groups`
--

INSERT INTO `jos_groups` (`id`, `name`) VALUES
(0, 'Public'),
(1, 'Registered'),
(2, 'Special');

-- --------------------------------------------------------

--
-- Table structure for table `jos_menu`
--

CREATE TABLE IF NOT EXISTS `jos_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menutype` varchar(75) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `alias` varchar(255) NOT NULL DEFAULT '',
  `link` text,
  `type` varchar(50) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `parent` int(11) unsigned NOT NULL DEFAULT '0',
  `componentid` int(11) unsigned NOT NULL DEFAULT '0',
  `sublevel` int(11) DEFAULT '0',
  `ordering` int(11) DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `pollid` int(11) NOT NULL DEFAULT '0',
  `browserNav` tinyint(4) DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `utaccess` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  `lft` int(11) unsigned NOT NULL DEFAULT '0',
  `rgt` int(11) unsigned NOT NULL DEFAULT '0',
  `home` int(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `componentid` (`componentid`,`menutype`,`published`,`access`),
  KEY `menutype` (`menutype`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `jos_menu`
--

INSERT INTO `jos_menu` (`id`, `menutype`, `name`, `alias`, `link`, `type`, `published`, `parent`, `componentid`, `sublevel`, `ordering`, `checked_out`, `checked_out_time`, `pollid`, `browserNav`, `access`, `utaccess`, `params`, `lft`, `rgt`, `home`) VALUES
(1, 'mainmenu', 'Home', 'home', 'index.php?option=com_content&view=frontpage', 'component', 1, 0, 20, 0, 3, 0, '0000-00-00 00:00:00', 0, 0, 0, 3, 'num_leading_articles=1\nnum_intro_articles=4\nnum_columns=2\nnum_links=4\norderby_pri=\norderby_sec=front\nshow_pagination=2\nshow_pagination_results=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 1),
(2, 'mainmenu', 'Home', 'home', 'index.php?option=com_content&view=section&id=1', 'component', -2, 0, 20, 0, 2, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'show_description=0\nshow_description_image=0\nshow_categories=1\nshow_empty_categories=0\nshow_cat_num_articles=1\nshow_category_description=1\norderby=\norderby_sec=\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(3, 'mainmenu', 'Company', 'company', '', 'separator', 1, 0, 0, 0, 4, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'menu_image=-1\n\n', 0, 0, 0),
(4, 'mainmenu', 'Company', 'company', 'index.php?option=com_content&view=section&id=3', 'component', -2, 0, 20, 0, 1, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'show_description=0\nshow_description_image=0\nshow_categories=1\nshow_empty_categories=0\nshow_cat_num_articles=1\nshow_category_description=1\norderby=\norderby_sec=\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(5, 'mainmenu', 'Services', 'services', '', 'separator', 1, 0, 0, 0, 5, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'menu_image=-1\n\n', 0, 0, 0),
(6, 'mainmenu', 'Blog', 'blog', 'index.php?option=com_content&view=category&layout=blog&id=23', 'component', 1, 0, 20, 0, 6, 62, '2011-04-18 14:01:43', 0, 0, 0, 0, 'show_description=0\nshow_description_image=0\nnum_leading_articles=1\nnum_intro_articles=4\nnum_columns=1\nnum_links=4\norderby_pri=\norderby_sec=\nmulti_column_order=0\nshow_pagination=2\nshow_pagination_results=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(7, 'mainmenu', 'Contacts', 'contacts', 'index.php?option=com_contact&view=contact&id=1', 'component', 1, 0, 7, 0, 7, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'show_contact_list=0\nshow_category_crumb=0\ncontact_icons=\nicon_address=\nicon_email=\nicon_telephone=\nicon_mobile=\nicon_fax=\nicon_misc=\nshow_headings=\nshow_position=\nshow_email=\nshow_telephone=\nshow_mobile=\nshow_fax=\nallow_vcard=\nbanned_email=\nbanned_subject=\nbanned_text=\nvalidate_session=\ncustom_reply=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(8, 'mainmenu', 'F.A.Q.', 'faq', 'index.php?option=com_content&view=section&id=7', 'component', 1, 0, 20, 0, 8, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'show_description=0\nshow_description_image=0\nshow_categories=1\nshow_empty_categories=0\nshow_cat_num_articles=1\nshow_category_description=1\norderby=\norderby_sec=\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(9, 'mainmenu', 'About Us', 'about-us', 'index.php?option=com_content&view=article&id=1', 'component', 1, 3, 20, 1, 1, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'show_noauth=\nshow_title=0\nlink_titles=\nshow_intro=\nshow_section=0\nlink_section=\nshow_category=0\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(10, 'submenu', 'Portfolio', 'portfolio', 'index.php?option=com_content&view=category&id=6', 'component', 1, 0, 20, 0, 1, 62, '2011-04-13 14:44:24', 0, 0, 0, 0, 'display_num=10\nshow_headings=0\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=_portfolio\nmenu_image=portfolio_icon.png\nsecure=0\n\n', 0, 0, 0),
(11, 'submenu', 'The Process', 'process', 'index.php?option=com_content&view=category&id=7', 'component', 1, 0, 20, 0, 2, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=0\nshow_date=0\ndate_format=\nfilter=0\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=0\nshow_feed_link=0\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(12, 'submenu', 'Order Now !', 'order', 'index.php?option=com_content&view=category&id=8', 'component', 1, 0, 20, 0, 3, 62, '2011-04-18 10:23:29', 0, 0, 0, 0, 'display_num=10\nshow_headings=0\nshow_date=0\ndate_format=\nfilter=0\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(13, 'mainmenu', 'Careers', 'careers', 'index.php?option=com_content&view=category&id=4', 'component', 1, 3, 20, 1, 2, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=0\nshow_headings=0\nshow_date=0\ndate_format=\nfilter=0\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=0\nshow_feed_link=0\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=0\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(14, 'mainmenu', 'Leadership', 'leadership', 'index.php?option=com_content&view=category&id=9', 'component', 1, 3, 20, 1, 3, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(15, 'mainmenu', 'In The News', 'in-the-news', 'index.php?option=com_content&view=category&id=10', 'component', 1, 3, 20, 1, 4, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(16, 'mainmenu', 'Project(Idea) Consulting', 'projectidea-consulting', 'index.php?option=com_content&view=category&id=12', 'component', 1, 5, 20, 1, 1, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(17, 'mainmenu', 'Technical Specification', 'technical-specification', 'index.php?option=com_content&view=category&id=13', 'component', 1, 5, 20, 1, 2, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(18, 'mainmenu', 'Design', 'design', 'index.php?option=com_content&view=category&id=14', 'component', 1, 5, 20, 1, 3, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(19, 'mainmenu', 'Mobile Application Development', 'mobile-application-development', 'index.php?option=com_content&view=category&id=16', 'component', 1, 5, 20, 1, 4, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(20, 'mainmenu', 'Game Development', 'game-development', 'index.php?option=com_content&view=category&id=17', 'component', 1, 5, 20, 1, 5, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(21, 'mainmenu', 'Testing & QA', 'testing-a-qa', 'index.php?option=com_content&view=category&id=18', 'component', 1, 5, 20, 1, 6, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(22, 'mainmenu', 'Release management(Publishing)', 'release-managementpublishing', 'index.php?option=com_content&view=category&id=19', 'component', 1, 5, 20, 1, 7, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0),
(23, 'mainmenu', 'Support', 'support', 'index.php?option=com_content&view=category&id=20', 'component', 1, 5, 20, 1, 8, 0, '0000-00-00 00:00:00', 0, 0, 0, 0, 'display_num=10\nshow_headings=1\nshow_date=0\ndate_format=\nfilter=1\nfilter_type=title\norderby_sec=\nshow_pagination=1\nshow_pagination_limit=1\nshow_feed_link=1\nshow_noauth=\nshow_title=\nlink_titles=\nshow_intro=\nshow_section=\nlink_section=\nshow_category=\nlink_category=\nshow_author=\nshow_create_date=\nshow_modify_date=\nshow_item_navigation=\nshow_readmore=\nshow_vote=\nshow_icons=\nshow_pdf_icon=\nshow_print_icon=\nshow_email_icon=\nshow_hits=\nfeed_summary=\npage_title=\nshow_page_title=1\npageclass_sfx=\nmenu_image=-1\nsecure=0\n\n', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `jos_menu_types`
--

CREATE TABLE IF NOT EXISTS `jos_menu_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menutype` varchar(75) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `menutype` (`menutype`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `jos_menu_types`
--

INSERT INTO `jos_menu_types` (`id`, `menutype`, `title`, `description`) VALUES
(1, 'mainmenu', 'Main Menu', 'The main menu for the site'),
(2, 'submenu', 'submenu', 'submenu');

-- --------------------------------------------------------

--
-- Table structure for table `jos_messages`
--

CREATE TABLE IF NOT EXISTS `jos_messages` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id_from` int(10) unsigned NOT NULL DEFAULT '0',
  `user_id_to` int(10) unsigned NOT NULL DEFAULT '0',
  `folder_id` int(10) unsigned NOT NULL DEFAULT '0',
  `date_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `state` int(11) NOT NULL DEFAULT '0',
  `priority` int(1) unsigned NOT NULL DEFAULT '0',
  `subject` text NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `useridto_state` (`user_id_to`,`state`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_messages`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_messages_cfg`
--

CREATE TABLE IF NOT EXISTS `jos_messages_cfg` (
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_name` varchar(100) NOT NULL DEFAULT '',
  `cfg_value` varchar(255) NOT NULL DEFAULT '',
  UNIQUE KEY `idx_user_var_name` (`user_id`,`cfg_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_messages_cfg`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_migration_backlinks`
--

CREATE TABLE IF NOT EXISTS `jos_migration_backlinks` (
  `itemid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` text NOT NULL,
  `sefurl` text NOT NULL,
  `newurl` text NOT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_migration_backlinks`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_modules`
--

CREATE TABLE IF NOT EXISTS `jos_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `ordering` int(11) NOT NULL DEFAULT '0',
  `position` varchar(50) DEFAULT NULL,
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `module` varchar(50) DEFAULT NULL,
  `numnews` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `showtitle` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `params` text NOT NULL,
  `iscore` tinyint(4) NOT NULL DEFAULT '0',
  `client_id` tinyint(4) NOT NULL DEFAULT '0',
  `control` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `published` (`published`,`access`),
  KEY `newsfeeds` (`module`,`published`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `jos_modules`
--

INSERT INTO `jos_modules` (`id`, `title`, `content`, `ordering`, `position`, `checked_out`, `checked_out_time`, `published`, `module`, `numnews`, `access`, `showtitle`, `params`, `iscore`, `client_id`, `control`) VALUES
(1, 'Main Menu', '', 0, 'top', 0, '0000-00-00 00:00:00', 0, 'mod_mainmenu', 0, 0, 1, 'menutype=mainmenu\nmenu_style=list_flat\nstartLevel=0\nendLevel=0\nshowAllChildren=0\nwindow_open=\nshow_whitespace=0\ncache=1\ntag_id=\nclass_sfx=\nmoduleclass_sfx=_menu\nmaxdepth=10\nmenu_images=0\nmenu_images_align=0\nmenu_images_link=0\nexpand_menu=0\nactivate_parent=0\nfull_active_id=0\nindent_image=0\nindent_image1=\nindent_image2=\nindent_image3=\nindent_image4=\nindent_image5=\nindent_image6=\nspacer=\nend_spacer=\n\n', 1, 0, ''),
(2, 'Login', '', 1, 'login', 0, '0000-00-00 00:00:00', 1, 'mod_login', 0, 0, 1, '', 1, 1, ''),
(3, 'Popular', '', 3, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_popular', 0, 2, 1, '', 0, 1, ''),
(4, 'Recent added Articles', '', 4, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_latest', 0, 2, 1, 'ordering=c_dsc\nuser_id=0\ncache=0\n\n', 0, 1, ''),
(5, 'Menu Stats', '', 5, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_stats', 0, 2, 1, '', 0, 1, ''),
(6, 'Unread Messages', '', 1, 'header', 0, '0000-00-00 00:00:00', 1, 'mod_unread', 0, 2, 1, '', 1, 1, ''),
(7, 'Online Users', '', 2, 'header', 0, '0000-00-00 00:00:00', 1, 'mod_online', 0, 2, 1, '', 1, 1, ''),
(8, 'Toolbar', '', 1, 'toolbar', 0, '0000-00-00 00:00:00', 1, 'mod_toolbar', 0, 2, 1, '', 1, 1, ''),
(9, 'Quick Icons', '', 1, 'icon', 0, '0000-00-00 00:00:00', 1, 'mod_quickicon', 0, 2, 1, '', 1, 1, ''),
(10, 'Logged in Users', '', 2, 'cpanel', 0, '0000-00-00 00:00:00', 1, 'mod_logged', 0, 2, 1, '', 0, 1, ''),
(11, 'Footer', '', 0, 'footer', 0, '0000-00-00 00:00:00', 1, 'mod_footer', 0, 0, 1, '', 1, 1, ''),
(12, 'Admin Menu', '', 1, 'menu', 0, '0000-00-00 00:00:00', 1, 'mod_menu', 0, 2, 1, '', 0, 1, ''),
(13, 'Admin SubMenu', '', 1, 'submenu', 0, '0000-00-00 00:00:00', 1, 'mod_submenu', 0, 2, 1, '', 0, 1, ''),
(14, 'User Status', '', 1, 'status', 0, '0000-00-00 00:00:00', 1, 'mod_status', 0, 2, 1, '', 0, 1, ''),
(15, 'Title', '', 1, 'title', 0, '0000-00-00 00:00:00', 1, 'mod_title', 0, 2, 1, '', 0, 1, ''),
(21, 'HXDMOOMENU', '', 0, 'top', 0, '0000-00-00 00:00:00', 1, 'mod_hxdmoomenu', 0, 0, 1, 'menutype=mainmenu\nmoo_bgiframe=0\nmoo_delay=500\nmoo_duration=300\nmoo_fps=100\nmoo_transition=Expo.easeOut\nmoo_effects=height\ntag_id=\nclass_sfx=\nmoduleclass_sfx=\nhxd_div_id=hxdmoomenu\ncache=1\ncache_time=900\n\n', 0, 0, ''),
(17, 'Categories of section', '', 0, 'top', 0, '0000-00-00 00:00:00', 0, 'mod_categories', 0, 0, 1, 'show_page_title=1\nid=0\npageclass_sfx=\nshow_description=0\nshow_description_image=0\nshow_categories=1\nshow_empty_categories=1\nshow_cat_num_articles=1\nshow_category_description=1\norderby=\ncache=1\n\n', 0, 0, ''),
(20, 'Latest news', '', 0, 'footer', 0, '0000-00-00 00:00:00', 0, 'mod_latestnews', 0, 0, 1, 'count=5\nordering=c_dsc\nuser_id=0\nshow_front=1\nsecid=9\ncatid=23\nmoduleclass_sfx=\ncache=1\ncache_time=900\n\n', 0, 0, ''),
(19, 'submenu', '', 0, 'user2', 0, '0000-00-00 00:00:00', 1, 'mod_mainmenu', 0, 0, 1, 'menutype=submenu\nmenu_style=horiz_flat\nstartLevel=0\nendLevel=0\nshowAllChildren=0\nwindow_open=\nshow_whitespace=0\ncache=1\ntag_id=\nclass_sfx=\nmoduleclass_sfx=\nmaxdepth=10\nmenu_images=0\nmenu_images_align=0\nmenu_images_link=0\nexpand_menu=0\nactivate_parent=0\nfull_active_id=0\nindent_image=0\nindent_image1=\nindent_image2=\nindent_image3=\nindent_image4=\nindent_image5=\nindent_image6=\nspacer=\nend_spacer=\n\n', 0, 0, ''),
(22, 'Breadcrumbs', '', 0, 'breadcrumb', 0, '0000-00-00 00:00:00', 1, 'mod_breadcrumbs', 0, 0, 1, 'showHome=1\nhomeText=INTERSOG MOBILE\nshowLast=1\nseparator=\nmoduleclass_sfx=\ncache=0\n\n', 0, 0, ''),
(23, 'AiDaNews', '', 2, 'footer', 62, '2011-04-18 07:44:51', 1, 'mod_aidanews', 0, 0, 1, 'cache=0\nURLtype=0\nitem_id=\nsecid=\ncatid=23\nexcatid=\nshow_front=2\ncount=6\nrecent=\nstartfrom=\nlimitwrittenby=0\norder=0\nrelated=0\nrelatednoid=\ndisplay_top_1=<h4>[title]</h4><p class="artDate">[date]</p>\ndisplay_top_2=[empty]\ndisplay_top_3=[empty]\ndisplay_top_4=[empty]\ndisplay_bottom=[readmore]\ngrid_display=0\ncolmax=2\ncolwidth=\ngridattr=\ngrid_valign=0\nclearboth=1\nshow_more=0\nmore_what=Select a custom link to display here in the backend\nmore_link=index.php\nmoreblank=0\nmoduleclass_sfx=\nmaincss=\ntitle_css=font-weight: bold; font-size: 105%;\nlink_css=\ndate_css=font-size: 75%;\nauthor_css=font-size: 75%;\ncategory_css=font-size: 75%;\nimage_css=padding: 2px; margin: 3px; border: 1px solid #C3C3C3;\nbody_intro_css=padding-top: 5px;\nreadmore_css=font-weight:bold; padding: 0; margin: 0;\nbody_bottom_css=padding: 0; margin: 0;\nbottom_more_css=\ndisp_catblock=0\ncatblock_css=\ncatcat=23\ndisp_cattit=0\ncattitle_css=font-weight: bold; font-size: 105%;\ndisp_catimg=1\ncatimagewidth=auto\ncatimageheight=60\ncatimage_css=padding: 2px; margin: 3px; border: 1px solid #C3C3C3;\ndisp_catdesc=1\ncatdesc_css=padding-top: 5px;\ndisp_catline=1\nlinktitle=1\nlimittitle=\nartblank=0\ntitle_ending=\nshow_intro=1\nnumber=222\nshorten=1\nintro_ending=\nfulltext=0\nallow=\nstripplugs=0\nstartfromp=0\nwhat_date=0\ndateoutput=\nwhat_username=0\nprofilesystem=0\ncontinue_reading=1\nreadmore_introtext=0\nshow_hits_image=0\nshow_rating_image=0\nshow_rating_average=1\nroundrating=0\ncommentstable=0\ncustomtable=\ncustomartcol=\nshow_comment_image=0\nshow_line=0\nline_color=#c3c3c3\nshow_image=1\nyouthumb=0\ngallery=0\nbasfold=images/stories\nuse_thumbs=0\nimageWidth=auto\nimageHeight=40\nimagefloat=1\nimage_default=images/stories/articles.jpg\nhide_default_image=0\nuse_tooltips=0\nquality=100\nthumbsuffix=\njs_avatar=1\nFLEXIcustom=\nlimitlang=\nuselangfile=0\nnothingtoshow=\ndate_prefix=\nauth_prefix=\ncat_prefix=\nreadmore=Read More\naddcomm=Add Comments\nfbshare=Share\nhit_prefix=\nhit_title_S=Hit\nhit_title_P=Hits\nrating_prefix=\nrating_title_S=Rating\nrating_title_P=Ratings\ncomment_prefix=\ncomment_title_S=Comment\ncomment_title_P=Comments\n\n', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `jos_modules_menu`
--

CREATE TABLE IF NOT EXISTS `jos_modules_menu` (
  `moduleid` int(11) NOT NULL DEFAULT '0',
  `menuid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`moduleid`,`menuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_modules_menu`
--

INSERT INTO `jos_modules_menu` (`moduleid`, `menuid`) VALUES
(1, 0),
(17, 0),
(19, 1),
(20, 1),
(21, 0),
(22, 0),
(23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jos_newsfeeds`
--

CREATE TABLE IF NOT EXISTS `jos_newsfeeds` (
  `catid` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `alias` varchar(255) NOT NULL DEFAULT '',
  `link` text NOT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `numarticles` int(11) unsigned NOT NULL DEFAULT '1',
  `cache_time` int(11) unsigned NOT NULL DEFAULT '3600',
  `checked_out` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `rtl` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `published` (`published`),
  KEY `catid` (`catid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_newsfeeds`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_plugins`
--

CREATE TABLE IF NOT EXISTS `jos_plugins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `element` varchar(100) NOT NULL DEFAULT '',
  `folder` varchar(100) NOT NULL DEFAULT '',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `published` tinyint(3) NOT NULL DEFAULT '0',
  `iscore` tinyint(3) NOT NULL DEFAULT '0',
  `client_id` tinyint(3) NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_folder` (`published`,`client_id`,`access`,`folder`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `jos_plugins`
--

INSERT INTO `jos_plugins` (`id`, `name`, `element`, `folder`, `access`, `ordering`, `published`, `iscore`, `client_id`, `checked_out`, `checked_out_time`, `params`) VALUES
(1, 'Authentication - Joomla', 'joomla', 'authentication', 0, 1, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(2, 'Authentication - LDAP', 'ldap', 'authentication', 0, 2, 0, 1, 0, 0, '0000-00-00 00:00:00', 'host=\nport=389\nuse_ldapV3=0\nnegotiate_tls=0\nno_referrals=0\nauth_method=bind\nbase_dn=\nsearch_string=\nusers_dn=\nusername=\npassword=\nldap_fullname=fullName\nldap_email=mail\nldap_uid=uid\n\n'),
(3, 'Authentication - GMail', 'gmail', 'authentication', 0, 4, 0, 0, 0, 0, '0000-00-00 00:00:00', ''),
(4, 'Authentication - OpenID', 'openid', 'authentication', 0, 3, 0, 0, 0, 0, '0000-00-00 00:00:00', ''),
(5, 'User - Joomla!', 'joomla', 'user', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', 'autoregister=1\n\n'),
(6, 'Search - Content', 'content', 'search', 0, 1, 1, 1, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\nsearch_content=1\nsearch_uncategorised=1\nsearch_archived=1\n\n'),
(7, 'Search - Contacts', 'contacts', 'search', 0, 3, 1, 1, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(8, 'Search - Categories', 'categories', 'search', 0, 4, 1, 0, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(9, 'Search - Sections', 'sections', 'search', 0, 5, 1, 0, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(10, 'Search - Newsfeeds', 'newsfeeds', 'search', 0, 6, 1, 0, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(11, 'Search - Weblinks', 'weblinks', 'search', 0, 2, 1, 1, 0, 0, '0000-00-00 00:00:00', 'search_limit=50\n\n'),
(12, 'Content - Pagebreak', 'pagebreak', 'content', 0, 10000, 1, 1, 0, 0, '0000-00-00 00:00:00', 'enabled=1\ntitle=1\nmultipage_toc=1\nshowall=1\n\n'),
(13, 'Content - Rating', 'vote', 'content', 0, 4, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(14, 'Content - Email Cloaking', 'emailcloak', 'content', 0, 5, 1, 0, 0, 0, '0000-00-00 00:00:00', 'mode=1\n\n'),
(15, 'Content - Code Hightlighter (GeSHi)', 'geshi', 'content', 0, 5, 0, 0, 0, 0, '0000-00-00 00:00:00', ''),
(16, 'Content - Load Module', 'loadmodule', 'content', 0, 6, 1, 0, 0, 0, '0000-00-00 00:00:00', 'enabled=1\nstyle=0\n\n'),
(17, 'Content - Page Navigation', 'pagenavigation', 'content', 0, 2, 1, 1, 0, 0, '0000-00-00 00:00:00', 'position=1\n\n'),
(18, 'Editor - No Editor', 'none', 'editors', 0, 0, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(19, 'Editor - TinyMCE', 'tinymce', 'editors', 0, 0, 1, 1, 0, 0, '0000-00-00 00:00:00', 'mode=advanced\nskin=0\ncompressed=0\ncleanup_startup=0\ncleanup_save=2\nentity_encoding=raw\nlang_mode=0\nlang_code=en\ntext_direction=ltr\ncontent_css=1\ncontent_css_custom=\nrelative_urls=1\nnewlines=0\ninvalid_elements=applet\nextended_elements=\ntoolbar=top\ntoolbar_align=left\nhtml_height=550\nhtml_width=750\nelement_path=1\nfonts=1\npaste=1\nsearchreplace=1\ninsertdate=1\nformat_date=%Y-%m-%d\ninserttime=1\nformat_time=%H:%M:%S\ncolors=1\ntable=1\nsmilies=1\nmedia=1\nhr=1\ndirectionality=1\nfullscreen=1\nstyle=1\nlayer=1\nxhtmlxtras=1\nvisualchars=1\nnonbreaking=1\ntemplate=0\nadvimage=1\nadvlink=1\nautosave=1\ncontextmenu=1\ninlinepopups=1\nsafari=1\ncustom_plugin=\ncustom_button=\n\n'),
(20, 'Editor - XStandard Lite 2.0', 'xstandard', 'editors', 0, 0, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(21, 'Editor Button - Image', 'image', 'editors-xtd', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(22, 'Editor Button - Pagebreak', 'pagebreak', 'editors-xtd', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(23, 'Editor Button - Readmore', 'readmore', 'editors-xtd', 0, 0, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(24, 'XML-RPC - Joomla', 'joomla', 'xmlrpc', 0, 7, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(25, 'XML-RPC - Blogger API', 'blogger', 'xmlrpc', 0, 7, 0, 1, 0, 0, '0000-00-00 00:00:00', 'catid=1\nsectionid=0\n\n'),
(27, 'System - SEF', 'sef', 'system', 0, 1, 1, 0, 0, 0, '0000-00-00 00:00:00', ''),
(28, 'System - Debug', 'debug', 'system', 0, 2, 1, 0, 0, 0, '0000-00-00 00:00:00', 'queries=1\nmemory=1\nlangauge=1\n\n'),
(29, 'System - Legacy', 'legacy', 'system', 0, 3, 0, 1, 0, 0, '0000-00-00 00:00:00', 'route=0\n\n'),
(30, 'System - Cache', 'cache', 'system', 0, 4, 0, 1, 0, 0, '0000-00-00 00:00:00', 'browsercache=0\ncachetime=15\n\n'),
(31, 'System - Log', 'log', 'system', 0, 5, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(32, 'System - Remember Me', 'remember', 'system', 0, 6, 1, 1, 0, 0, '0000-00-00 00:00:00', ''),
(33, 'System - Backlink', 'backlink', 'system', 0, 7, 0, 1, 0, 0, '0000-00-00 00:00:00', ''),
(34, 'System - Mootools Upgrade', 'mtupgrade', 'system', 0, 8, 0, 1, 0, 0, '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `jos_polls`
--

CREATE TABLE IF NOT EXISTS `jos_polls` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `voters` int(9) NOT NULL DEFAULT '0',
  `checked_out` int(11) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `access` int(11) NOT NULL DEFAULT '0',
  `lag` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_polls`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_poll_data`
--

CREATE TABLE IF NOT EXISTS `jos_poll_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pollid` int(11) NOT NULL DEFAULT '0',
  `text` text NOT NULL,
  `hits` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pollid` (`pollid`,`text`(1))
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_poll_data`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_poll_date`
--

CREATE TABLE IF NOT EXISTS `jos_poll_date` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `vote_id` int(11) NOT NULL DEFAULT '0',
  `poll_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `poll_id` (`poll_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_poll_date`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_poll_menu`
--

CREATE TABLE IF NOT EXISTS `jos_poll_menu` (
  `pollid` int(11) NOT NULL DEFAULT '0',
  `menuid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pollid`,`menuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_poll_menu`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_sections`
--

CREATE TABLE IF NOT EXISTS `jos_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `image` text NOT NULL,
  `scope` varchar(50) NOT NULL DEFAULT '',
  `image_position` varchar(30) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) unsigned NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `access` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_scope` (`scope`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `jos_sections`
--

INSERT INTO `jos_sections` (`id`, `title`, `name`, `alias`, `image`, `scope`, `image_position`, `description`, `published`, `checked_out`, `checked_out_time`, `ordering`, `access`, `count`, `params`) VALUES
(1, 'Home', '', 'home', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 1, 0, 10, ''),
(3, 'Company', '', 'company', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 2, 0, 7, ''),
(4, 'Services', '', 'services', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 3, 0, 10, ''),
(5, 'Blog', '', 'blog', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 4, 0, 0, ''),
(6, 'Contacts', '', 'contacts', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 5, 0, 1, ''),
(7, 'F.A.Q.', '', 'faq', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 6, 0, 0, ''),
(8, 'Submenu', '', 'submenu', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 7, 0, 5, ''),
(9, 'News', '', 'news', '', 'content', 'left', '', 1, 0, '0000-00-00 00:00:00', 8, 0, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `jos_session`
--

CREATE TABLE IF NOT EXISTS `jos_session` (
  `username` varchar(150) DEFAULT '',
  `time` varchar(14) DEFAULT '',
  `session_id` varchar(200) NOT NULL DEFAULT '0',
  `guest` tinyint(4) DEFAULT '1',
  `userid` int(11) DEFAULT '0',
  `usertype` varchar(50) DEFAULT '',
  `gid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `client_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `data` longtext,
  PRIMARY KEY (`session_id`(64)),
  KEY `whosonline` (`guest`,`usertype`),
  KEY `userid` (`userid`),
  KEY `time` (`time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_session`
--

INSERT INTO `jos_session` (`username`, `time`, `session_id`, `guest`, `userid`, `usertype`, `gid`, `client_id`, `data`) VALUES
('admin', '1303142434', 'c31973205c8c2229f70a9872026b8abb', 0, 62, 'Super Administrator', 25, 1, '__default|a:8:{s:22:"session.client.browser";s:120:"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16";s:15:"session.counter";i:168;s:8:"registry";O:9:"JRegistry":3:{s:17:"_defaultNameSpace";s:7:"session";s:9:"_registry";a:6:{s:7:"session";a:1:{s:4:"data";O:8:"stdClass":0:{}}s:11:"application";a:1:{s:4:"data";O:8:"stdClass":1:{s:4:"lang";s:0:"";}}s:10:"com_cpanel";a:1:{s:4:"data";O:8:"stdClass":1:{s:9:"mtupgrade";O:8:"stdClass":1:{s:7:"checked";b:1;}}}s:9:"com_menus";a:1:{s:4:"data";O:8:"stdClass":1:{s:8:"menutype";s:8:"mainmenu";}}s:11:"com_content";a:1:{s:4:"data";O:8:"stdClass":8:{s:23:"viewcontentfilter_order";s:12:"section_name";s:27:"viewcontentfilter_order_Dir";s:0:"";s:23:"viewcontentfilter_state";s:0:"";s:16:"viewcontentcatid";s:1:"6";s:26:"viewcontentfilter_authorid";i:0;s:27:"viewcontentfilter_sectionid";s:1:"8";s:17:"viewcontentsearch";s:0:"";s:21:"viewcontentlimitstart";i:0;}}s:6:"global";a:1:{s:4:"data";O:8:"stdClass":1:{s:4:"list";O:8:"stdClass":1:{s:5:"limit";s:2:"20";}}}}s:7:"_errors";a:0:{}}s:4:"user";O:5:"JUser":19:{s:2:"id";s:2:"62";s:4:"name";s:13:"Administrator";s:8:"username";s:5:"admin";s:5:"email";s:22:"nryzhkina@intersog.com";s:8:"password";s:65:"b067848d6f11a326e10e2c9562d3960f:O1rzZFOrYYBnAXxEKiu6AIveTnMFJBA4";s:14:"password_clear";s:0:"";s:8:"usertype";s:19:"Super Administrator";s:5:"block";s:1:"0";s:9:"sendEmail";s:1:"1";s:3:"gid";s:2:"25";s:12:"registerDate";s:19:"2011-04-11 14:49:31";s:13:"lastvisitDate";s:19:"2011-04-18 13:39:10";s:10:"activation";s:0:"";s:6:"params";s:0:"";s:3:"aid";i:2;s:5:"guest";i:0;s:7:"_params";O:10:"JParameter":7:{s:4:"_raw";s:0:"";s:4:"_xml";N;s:9:"_elements";a:0:{}s:12:"_elementPath";a:1:{i:0;s:69:"Z:\\home\\apps.intersog.loc\\www\\libraries\\joomla\\html\\parameter\\element";}s:17:"_defaultNameSpace";s:8:"_default";s:9:"_registry";a:1:{s:8:"_default";a:1:{s:4:"data";O:8:"stdClass":0:{}}}s:7:"_errors";a:0:{}}s:9:"_errorMsg";N;s:7:"_errors";a:0:{}}s:13:"session.token";s:32:"645d5cea90172943eefe58fb6c8912f8";s:19:"session.timer.start";i:1303137185;s:18:"session.timer.last";i:1303141594;s:17:"session.timer.now";i:1303142434;}');

-- --------------------------------------------------------

--
-- Table structure for table `jos_stats_agents`
--

CREATE TABLE IF NOT EXISTS `jos_stats_agents` (
  `agent` varchar(255) NOT NULL DEFAULT '',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `hits` int(11) unsigned NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_stats_agents`
--


-- --------------------------------------------------------

--
-- Table structure for table `jos_templates_menu`
--

CREATE TABLE IF NOT EXISTS `jos_templates_menu` (
  `template` varchar(255) NOT NULL DEFAULT '',
  `menuid` int(11) NOT NULL DEFAULT '0',
  `client_id` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`menuid`,`client_id`,`template`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jos_templates_menu`
--

INSERT INTO `jos_templates_menu` (`template`, `menuid`, `client_id`) VALUES
('mobile', 0, 0),
('khepri', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jos_users`
--

CREATE TABLE IF NOT EXISTS `jos_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(150) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `usertype` varchar(25) NOT NULL DEFAULT '',
  `block` tinyint(4) NOT NULL DEFAULT '0',
  `sendEmail` tinyint(4) DEFAULT '0',
  `gid` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `registerDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `lastvisitDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `activation` varchar(100) NOT NULL DEFAULT '',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usertype` (`usertype`),
  KEY `idx_name` (`name`),
  KEY `gid_block` (`gid`,`block`),
  KEY `username` (`username`),
  KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `jos_users`
--

INSERT INTO `jos_users` (`id`, `name`, `username`, `email`, `password`, `usertype`, `block`, `sendEmail`, `gid`, `registerDate`, `lastvisitDate`, `activation`, `params`) VALUES
(62, 'Administrator', 'admin', 'nryzhkina@intersog.com', 'b067848d6f11a326e10e2c9562d3960f:O1rzZFOrYYBnAXxEKiu6AIveTnMFJBA4', 'Super Administrator', 0, 1, 25, '2011-04-11 14:49:31', '2011-04-18 14:33:06', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `jos_weblinks`
--

CREATE TABLE IF NOT EXISTS `jos_weblinks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `catid` int(11) NOT NULL DEFAULT '0',
  `sid` int(11) NOT NULL DEFAULT '0',
  `title` varchar(250) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `url` varchar(250) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `hits` int(11) NOT NULL DEFAULT '0',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ordering` int(11) NOT NULL DEFAULT '0',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `approved` tinyint(1) NOT NULL DEFAULT '1',
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `catid` (`catid`,`published`,`archived`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `jos_weblinks`
--

