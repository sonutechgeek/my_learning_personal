$(document).ready( function(){
    $('#searchuser').on('keyup',function(e){
        let username=e.target.value;

        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'118376eaa2d620e93f91',
                client_secreat:'f15d76eb93cd597a2a9d705e66e74f9afdfa30de'
            }
        }).done(function(user){
            // console.log(user);
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'118376eaa2d620e93f91',
                    client_secreat:'f15d76eb93cd597a2a9d705e66e74f9afdfa30de'
                }
            }).done(function(repos){
               $.each(repos,function(index,repo){
                $('#repos').append(`
                  <div class="well">
                    <div class="row">
                      <div class="col-md-7">
                      <strong>${ repo.name}</strong>${repo.discription}
                      </div>
                      <div class="col-md-3">
                   
                      </div>
                      <div class="col-md-2">
                   
                      </div>
                    </div>
                  </div>
                `);
               })
            })
            $('#profile').html(`
                <div class ='panel panel-default'>
                    <div class ='panel-heading'>
                      <h3 class="panel-title">${user.name}</h3>
                    </div>

                    <div class ='panel-body'>
                         <div class ='row'>
                              <div class ='col-md-3'>
                                 <img style="width:100%;"class = "thumbnail"src=" ${user.avatar_url}"/>
                                 <a style="width:100%;"target="_blank"class ="btn btn-primary btn-block" href="${user.html_url}">ViewProfile</a>                             
                                 </div>
                              <div class ='col-md-9'>
                              
                                  <br>
                                <span class="label label-default">Public Repos :${user.public_repos}</span>
                                <span class="label label-primary"> Public Gist :${user.public_gists}</span>
                                <span class="label label-success"> Follower  :${user.followers}</span>
                                <span class="label label-info"> Following  :${user.following} </span>
                              <br><br>
                               <ul class="list-group">
                                <li class="list-group-item">Company:${user.company} </li>
                                <li class="list-group-item">Website/blog:${user.blog} </li>
                                <li class="list-group-item">Location:${user.location} </li>
                                <li class="list-group-item">Member since:${user.created_at} </li>
                                
                               </ul>

                              </div>
                         </div>
                    </div>
                </div>
                <h3 class ="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        })
    })
})