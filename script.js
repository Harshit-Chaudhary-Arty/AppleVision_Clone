function togethergsapscrolltrigger(){
        gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
togethergsapscrolltrigger()


gsap.to("#page1>video",{
    scrollTrigger:{
        // markers:true,
        start:"top -2%",
        end:"bottom top",
        scroller:"#main",
        trigger:"#page1>video",
    },
    onStart:()=>{
        document.querySelector("#page1 video").play()
    }
})

gsap.to("#page1",{
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page1",
        pin:true,
        start:"top 0%",
        end:"bottom top",
        // markers:true
    }
})


var tl = gsap.timeline({
    // opacity:"0",
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page2",
        pin:true,
        scrub:1,
        markers:true,
        start:"top 0%",
        end:"bottom top"
    }
})

tl.to("#page2 h1",{
    top:"-50%",
})


var tl2 = gsap.timeline({
    // opacity:"0",
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page3",
        pin:true,
        scrub:1,
        markers:true,
        start:"top 0%",
        end:"bottom top"
    }
})

tl2.to("#page3 h1",{
    top:"-50%",
})