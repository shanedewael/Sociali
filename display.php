                                                                                                                                                                                                                                                                <?php
include('twitteroauth/twitter.inc');
require_once 'twitteroauth/twitteroauth.php';
 
define('CONSUMER_KEY', 'pV3W6vLEN3YwpUOuXR5vyKGrd');
define('CONSUMER_SECRET', 'KJjPhJyagxWD16nmNi2AqkowaMuz90MgSLIMa9M04NcyMUwSjE');
define('ACCESS_TOKEN', '308808790-KBeCCTBt5lZXqd1rPbxSTOhxhXSt8Ei3eH6A1w7e');
define('ACCESS_TOKEN_SECRET', 'sQPduTNdT40CowN7q7Dq51fZP6X5MLeI2pSlrXfeBcwYO');
 
$toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
include('twitter.inc');
$max_id = "";
foreach (range(1, 1) as $i) { // up to 10 result pages
 
  $query = array(
    "q" => $_REQUEST['title'], // Change here
    "count" => 15,
    "result_type" => 'mixed'
  );
 
  $results = $toa->get('search/tweets', $query);

  foreach ($results->statuses as $result) {
  include('tweetclass.inc');
    
    echo "" . $result->text . "\n";
    echo '<span class="user">';
    echo " " . $result->user->screen_name; 
    echo "</span>";
    echo "<hr/>";
    $max_id = $result->id_str; // Set max_id for the next search result page
    echo "<br/>";
    
    include('tweetclass2.inc');
  }
}
include('twitter2.inc');                            
                            
                            
                            
                            
                            
                            
                            