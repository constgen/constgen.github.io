<?php

chdir('../');
include_once 'conf/system.php';
include_once 'libs/db.php';

if(empty($_POST)){
	
	die();
}
//var_dump($_FILES);
//var_dump($_POST);
$arrData=array(
'jobtype'=>$_POST['jobtype'],
'firstname'=>$_POST['firstname'],
'lastname' =>$_POST['lastname'],
'email'  =>$_POST['email'],
'phone'  =>$_POST['phone'],
'linkedin' =>$_POST['linkedin'],
//'resumefile'=>$_POST['resumefile'],
'resumetext'=>$_POST['resumetext'],
'coverletter'=>$_POST['coverletter'],
'sites'  =>$_POST['sites'],
'uniquejob'=>$_POST['unique'],
'interes'=>$_POST['interes']
	);

$status=0;

$lastId=setDBase($arrData);
if($lastId){
	$status=1;
	if(isset($_FILES["resumefile"]["tmp_name"])){
		if(!empty($_FILES["resumefile"]["tmp_name"])){
			$resumePath=saveResumeFile($lastId);
			if(!$resumePath)
				$status=0;
		}
		else
			$resumePath=false;
	}
	else
		$resumePath=false;
	if($status==1)
		$status=sendMail($arrData,$resumePath);
}
else 
	$status =0;


echo $status;
//end

function sendMail($arrData,$resumPath=false){
	
	include_once 'libs/PHPMailer/class.phpmailer.php';
	
	$mail = new PHPMailer(true);
	try {
		//$mail->AddReplyTo('name@digi117.com', 'JOBS');
		$mail->AddAddress('mchorich@intersog.com', 'John Doe');
		$mail->AddAddress('nryzhkina@intersog.com', 'John Doe');
		//$mail->AddAddress('cgenchevsky@intersog.com', 'John Doe');
		//$mail->AddAddress('scherednichenko@intersog.com', 'John Doe');
		$mail->AddAddress('jobs-ca@digi117.com','John Doe');
		
		$mail->SetFrom('name@digi117.com', 'digi117_JOBS');
		//$mail->AddReplyTo('name@yourdomain.com', 'First Last');
		$mail->Subject = 'job to '.$_POST['jobname'].' position';
		//$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
		
		$html="<table border='1'>";
		foreach ($arrData as $key=>$val){
			if($key=='jobtype')
				continue;
			$val=  nl2br($val);
			$html .="<tr><td>$key</td><td>$val</td></tr>";
		}
		$html.="</table>";
		$mail->MsgHTML($html);
		if($resumPath)
			$mail->AddAttachment($resumPath);
		$mail->Send();
		//return "Message Sent OK</p>\n";
		return 1;
	} catch (phpmailerException $e) {
		//return $e->errorMessage(); //Pretty error messages from PHPMailer
		return 0;
	} catch (Exception $e) {
		//return $e->POSTMessage(); //Boring error messages from anything else!
		return 0;
	}
}

function setDBase($arrData){
	$db=new dbModel();
	$values='';
	foreach ($arrData as $key=>$val){
		$val=  mysql_escape_string($val);
		$values .="$key='$val', ";
	}
	$values=  substr($values, 0, strlen($values)-2);
	$query="insert into jobs set ".$values;
	
	$res=$db->q($query);
	if($res)
		return $db->lastInsertID;
	else
		return false;
}

function saveResumeFile($id){

	$filePath=$_FILES["resumefile"]["tmp_name"];
	$filename=$_FILES["resumefile"]["name"];
	$uploads_dir = dirname(__FILE__). '/../resums/';
	
	if(move_uploaded_file($filePath, $uploads_dir.$id."_".$filename))
		return $uploads_dir.$id."_".$filename;
	else
		return false;
}



$t=array(
	"resumefile"=> array(
		"name"=>"Uganda+Iap.docx" ,
		"type"=>"application/vnd.openxmlformats-officedocument.wordprocessingml.document" ,
		"tmp_name"=>"/tmp/phpFRozDQ" ,
		"error"=> 0 ,
		"size"=> 5047 
	)
);
