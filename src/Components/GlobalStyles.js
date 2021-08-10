import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  html {
    --color-text-dark: black;
    --color-text-light: #f2fdf7;
    --color-background: #f2fdf7;
    --color-light: #a9cfd0;
    --color-light-disabled: #a9cfd050;
    --color-med: #35aa9a;
    --color-dark: #005a41;
    --color-dark-disabled: #005a4175;
    --color-very-dark: #002b32;

    --cancel-button-background-color: #a9cfd0;
    --cancel-button-border-color: #005a41;
    --cancel-button-color: #005a41;

    background-color: var(--color-background);

    a {
      display: inline-block;
      position: relative;
      text-decoration: none;
      color: inherit;
      z-index: 1;
    }

    a:hover::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: .07em;
      height: .05em;
      width: 100%;
      background: linear-gradient(110deg, var(--color-light), var(--color-med), var(--color-dark), var(--color-very-dark));
      z-index: -1;
      transition: height .25s cubic-bezier(.6,0,.4,1);
    }
    a:hover {
      color: inherit;
      text-decoration: none;
    }

    a:hover::after {
      height: .2em;
    }

    a:visted {
      color: inherit;
      text-decoration: none;
    }

    h1 {
      text-align: center;
    }
    hr {
      color: var(--color-light);
    }
    li {
      list-style: none;
    }
  }
  
  .dropdown-item.active, .dropdown-item:active {
    background-color: var(--color-med);
  }
  .edit, .trash {
    cursor: pointer;
  }
  .form-control:focus {
    border-color: var(--color-light);
    box-shadow: 0 0 0 0.2rem var(--color-light-disabled);
  }
  .rbt-input-multi.focus{
    border-color: var(--color-med);
    box-shadow: 0 0 0 0.2rem var(--color-light);  
  }
  .rbt-token {
    background-color: var(--color-light);
    color: var(--color-dark);
  }
  .rbt-token .rbt-token-remove-button {
    right: -65px;
    top: -5px;
  }
  .past-event {
    font-style: italic;
  }
  .customNav {
    background-color: var(--color-light);
    color: var(--color-dark);
    padding: 10px;
    @media screen and (min-width: 600px) {
      background-color: inherit;
      color: inherit;
      padding: inherit;
    }
  }

`;

//can't set BP vars so here's where we'll document them.
//--breakpoint-phone: 480px;
//--breakpoint-tablet: 769px;

//nav styling to try out later. details at https://codepen.io/RSH87/pen/rmgYbo

// $background--color:#1e2023;
// $icon--color:#1e2023;
// $font--color:#ffffff;
// $font--color--active:#000000;
// $font--primary:'Fira Sans', sans-serif;
// $transition--length: .8;

// body{
// 	background-color: $background--color;
// 	font-family: $font--primary;
// 	-webkit-font-smoothing: antialiased;
// 	-moz-osx-font-smoothing: grayscale;
// }

// .site-content{
// 	max-width: 1100px;
// 	height: 100vh;
// 	margin-left: auto;
// 	margin-right: auto;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	&__headline{
// 		font-weight: 200;
// 		color: $font--color;
// 		font-size: calc(2vw + 10px);
// 	}
// }

// //default state
// .menu-icon{
// 	$size: 30px;
// 	height: $size;
// 	width: $size;
// 	position: fixed;
// 	z-index:2;
// 	left: 50px;
// 	top: 30px;
// 	cursor: pointer;
// 	&__line{
// 		height: 2px;
// 		width: $size;
// 		display: block;
// 		background-color: $font--color;
// 		margin-bottom: 4px;
// 		transition: transform .2s ease, background-color .5s ease;
// 	}
// 	&__line-left{
// 		width: $size / 2;
// 	}
// 	&__line-right{
// 		width: $size / 2;
// 		float: right;
// 	}
// }

// .nav{
// 	$width: 100vw;
// 	$height: 100vh;
// 	$font--size--calc: calc(2vw + 10px);
// 	$transition--easing: cubic-bezier(.77,0,.175,1);
// 	position: fixed;
// 	z-index:1;
// 	&:before,&:after{
// 		content: "";
// 		position: fixed;
// 		width:$width;
// 		height:$height;
// 		background: rgba(#eaeaea, .2);
// 		z-index: -1;
// 		transition: transform $transition--easing $transition--length + s;
// 		transform: translateX(0%) translateY(-100%);
// 	}
// 	&:after{
// 		background: rgba(#ffffff, 1);
// 		transition-delay: 0s;
// 	}
// 	&:before{
// 		transition-delay: .1s;
// 	}
// 	&__content{
// 		position: fixed;
// 		top:50%;
// 		transform: translate(0%,-50%);
// 		width: 100%;
//     	text-align: center;
// 		font-size: $font--size--calc;
// 		font-weight: 200;
// 		cursor: pointer;
// 	}
// 	&__list-item{
// 		position: relative;
// 		display: inline-block;
// 		transition-delay: $transition--length + s;
// 		opacity: 0;
// 		transform: translate(0%, 100%);
// 		transition: opacity .2s ease, transform .3s ease;
// 		margin-right: 25px;
// 		&:before{
// 			content: "";
// 			position: absolute;
// 			background: $font--color--active;
// 			width: 20px;
// 			height: 1px;
// 			top: 100%;
// 			transform: translate(0%, 0%);
// 			transition: all .3s ease;
// 			z-index: -1;
// 		}
// 		&:hover{
// 			&:before{
// 				width: 100%;
// 			}
// 		}
// 	}
// }

// //active state
// body.nav-active{
// 	$menu--items--count: 4;
// 	.menu-icon{
// 		&__line{
// 			background-color: #000;
// 			transform: translateX(0px) rotate(-45deg);
// 		}
// 		&__line-left{
// 			transform: translateX(1px) rotate(45deg);
// 		}
// 		&__line-right{
// 			transform: translateX(-2px) rotate(45deg);
// 		}
// 	}
// 	.nav{
// 		visibility:visible;
// 		&:before,&:after{
// 			transform: translateX(0%) translateY(0%);
// 		}
// 		&:after{
// 			transition-delay: .1s;
// 		}
// 		&:before{
// 			transition-delay: 0s;
// 		}
// 		&__list-item{
// 			opacity: 1;
// 			transform: translateX(0%);
// 			transition: opacity .3s ease, transform .3s ease, color .3s ease;
// 			@for $i from 0 through $menu--items--count {
// 				&:nth-child(#{$i}){
// 					transition-delay: $transition--length * $i / 8 + .5 + s;
// 				}
// 			}
// 		}
// 	}
// }
