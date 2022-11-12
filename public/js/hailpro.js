const form = document.querySelector('.form')
const form2 = document.querySelector('.form2')
const inp1 = document.querySelector('#frin')
const inp2 = document.querySelector('#ccin')
const inp3 = document.querySelector('#elin')
const sp1 = document.querySelector('#sp1')
const sp2 = document.querySelector('#sp2')
const line1 = document.querySelector('#line1')
const line2 = document.querySelector('#line2')
const trf = document.querySelector('#trf')


form.addEventListener("submit", function (e) {
    e.preventDefault();
    let freezing = inp1.value
    let ccl = inp2.value
    let el = inp3.value
    let depthr = (ccl - freezing) / (freezing - el)
    sp1.innerHTML = `${depthr.toFixed(2)}0`
    sp2.innerText = freezing
    sp1.style.fontSize = '13px';
    x1 = conv1(depthr, 0.340)
    x2 = conv2(freezing, 610)
    sp1.style.transform = `translateY(${x1}px)`
    line1.style.transform = `translateY(${x1 - 5}px)`
    sp2.style.transform = `translateX(${x2}px)`
    line2.style.transform = `translateX(${x2}px)`
    checker(freezing, depthr)
    if (depthr > 0.580 || depthr < 0.100 || freezing < 533 || freezing > 695) {
        line1.style.display = "none"
        line2.style.display = "none"
    }
    else {
        line1.style.display = "block"
        line2.style.display = "block"
    }
})

function conv1(old, nw) {
    trns1 = 580 % 480 * (nw - old) * 10
    return trns1
}
function conv2(old2, nw2) {
    trns2 = 678.5 % (695 - 533) * (old2 - nw2) / 10
    return trns2
}
function checker(y1, y2) {
    if (y1 >= 570 && y2 <= 0.380) {
        trf.value = 'Hail possible'
    }
    else { trf.value = 'Hail not possible' }
}

freezing === null;
ccl === null;
el === null;