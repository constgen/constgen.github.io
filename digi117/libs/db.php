<?php
include_once 'conf/db.php';
class dbModel extends ConfigDB{
public $r;
public $c;
public $connection;
public $error;
public $lastInsertID;

static private $instance = NULL;

static function getInstance(){
	if (self::$instance == NULL) self::$instance = new dbModel();
	return self::$instance;
}
function __construct() {
	$this->error="";
	$this->lastInsertID = 0;
	
	$this->connection=mysql_connect($this->host, $this->user, $this->pass);
	mysql_select_db($this->base, $this->connection);
	mysql_query("set character_set_client='utf8'");
	mysql_query("set character_set_results='utf8'");
	mysql_query("set collation_connection='utf8_general_ci'");
	if (!$this->connection) $this->error_log(mysql_error());
}
function __destruct(){@mysql_close($this->connection);}
    
function error_log($error,$sql=''){
	if(!empty($error)){
		$this->error=$error;
		$file="Script name: ".$_SERVER['HTTP_HOST']."".$_SERVER['PHP_SELF']."";
		$file.="\r\nURL: ".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$sql_error_text="";
		$sql_error_text.=$sql."\r\n\r\n";
		$sql_error_text.=$error."\r\n\r\n";
		$sql_error_text.=$file;
		if ($_SERVER['HTTP_HOST']=='digi117.dev')
			echo '<hr>'.$sql_error_text.'<hr>';
		else
			@mail('mchorich@intersog.com', 'Digi117 SQL ERROR', $sql_error_text);
	}
}
function q($query_string){
	$this->lastInsertID = 0;
	$this->error="";
	$this->c=0;
	unset($this->r);
	$this->r=array();
	$query_result=mysql_query($query_string, $this->connection);
	if (strpos(strtoupper($query_string), 'INSERT')===0)
		$this->lastInsertID = mysql_insert_id($this->connection);
	$this->error_log(mysql_error(), $query_string);
	while($f=@mysql_fetch_array($query_result))array_push($this->r, $f);
	//unset($query_result);
	$this->c=count($this->r);
	return $query_result;
}

function qval($query_string){
	$this->error="";
	unset($this->r);
	$this->r=array();
	$query_result=@mysql_query($query_string, $this->connection);
	$this->error_log(mysql_error(), $query_string);
	$f=@mysql_fetch_array($query_result);
	unset($query_result);
	$this->c=1;
	$this->r=$f[0];}
        
function qarr($query_string){
	$this->error="";
	unset($this->r);
	$this->r=array();
	$query_result=@mysql_query($query_string, $this->connection);
	$this->error_log(mysql_error(), $query_string);
	$arr=array();
	while($f=@mysql_fetch_array($query_result))array_push($arr, $f[0]);
	unset($query_result);
	$this->c=count($arr);
	$this->r=$arr;}

function qcol($query_string){
	$this->error="";
	unset($this->r);
	$this->r=array();
	$query_result=@mysql_query($query_string, $this->connection);
	$this->error_log(mysql_error(), $query_string);
	$arr=array();
	while($f=@mysql_fetch_array($query_result))$arr[$f[0]]=$f[1];
	unset($query_result);
	$this->c=count($arr);
	$this->r=$arr;}

	function insertInt($var_value){return (int)$var_value;}
	function insertFloat($var_value){return (float)$var_value;}
	function insertStr($var_value){return mysql_escape_string($var_value);}
}
?>
