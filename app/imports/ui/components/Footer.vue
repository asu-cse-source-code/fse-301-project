<template>
  <footer class="mainfooter" role="contentinfo">
    <div class="footer-middle">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-6">
            <!--Column1-->
            <div class="footer-pad">
              <h4>About No-Limit Planner</h4>
              <p class="about pt-3">
                An app focused on helping people with ADHD by leveraging
                techniques beyond what works solely for neurotypical people to
                limit anxiety and distractions while increasing productivity.
              </p>
            </div>
          </div>
          <div class="col-md-2 col-sm-6"></div>
          <div class="col-md-4 col-sm-6">
            <!--Column1-->
            <div class="footer-pad">
              <!-- <h4>
                Laude Capital
                <img src="https://austinspencer.works/images/logo.png" />
              </h4> -->
              <h4>Important Links</h4>
              <p class="menu pt-3">
                <a href="/">Home </a>&ensp;|&ensp;
                <a href="/about">About </a>&ensp;|&ensp;
                <!-- <a href="https://laudecapital.com/login"> Login </a> &ensp;|&ensp; -->
                <a href="mailto:admin@austinbspencer.com"> Contact </a
                >&ensp;|&ensp;
                <!-- <a href="https://github.com/austinbspencer" class="github"
                  ><i class="fas fa-code-branch"></i></a
                >&ensp;|&ensp; -->
                <a href="mailto:issue@austinbspencer.com">Issues</a>
              </p>
              <h5>Follow Us</h5>
              <ul class="pt-3 social-network social-circle">
                <!-- <li>
                  <a href="https://github.com/laude-capital" class="github"
                    ><i class="fab fa-github-square fa-2x"></i>&emsp;</a
                  >
                </li> -->
                <li>
                  <a href="#" class="github"
                    ><i class="fab fa-instagram fa-2x"></i>&emsp;</a
                  >
                </li>
                <li>
                  <a href="#" class="github"
                    ><i class="fab fa-twitter fa-2x"></i>&emsp;</a
                  >
                </li>
                <li>
                  <a href="#" class="github"
                    ><i class="fab fa-facebook fa-2x"></i>&emsp;</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <hr /> -->
        <div class="row">
          <div class="col-md-12 copy">
            <p class="text-center">
              &copy; Copyright 2021 - No-Limit Planner. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
p {
  font-size: 14px;
}
footer {
  background: #16222a;
  background: -webkit-linear-gradient(59deg, #146325, #16222a);
  background: linear-gradient(59deg, #47a18e, #16222a);
  color: white;
  margin-top: 100px;
}

footer a {
  color: #fff;
  font-size: 14px;
  transition-duration: 0.2s;
}

footer a:hover {
  color: grey;
  text-decoration: none;
}

.copy {
  font-size: 12px;
  padding: 10px;
  border-top: 1px solid #ffffff;
}

.footer-middle {
  padding-top: 2em;
  color: white;
}

/*SOCİAL İCONS*/

/* footer social icons */

ul.social-network {
  list-style: none;
  display: inline;
  margin-left: 0 !important;
  padding: 0;
}

ul.social-network li {
  display: inline;
  margin: 0 5px;
}

/* footer social icons */
.social-circle li a {
  display: inline-block;
  position: relative;
  margin: 0 auto 0 auto;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  text-align: center;
  width: 30px;
  height: 30px;
  font-size: 17px;
}

.social-circle li i {
  margin: 0;
  line-height: 30px;
  text-align: center;
}

.social-circle li a:hover i,
.triggeredHover {
  -moz-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -ms--transform: rotate(360deg);
  transform: rotate(360deg);
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -ms-transition: all 0.2s;
  transition: all 0.2s;
}

.social-circle i {
  /* color: #595959; */
  -webkit-transition: all 0.8s;
  -moz-transition: all 0.8s;
  -o-transition: all 0.8s;
  -ms-transition: all 0.8s;
  transition: all 0.8s;
}

/* .social-network a {
  background-color: #f9f9f9;
} */

.github {
  color: white;
}
</style>
