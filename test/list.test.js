
it('pass', function(){})
it('fail', function(){throw new Error('intentional')})
it('skip', function(){throw new Error('intentional')}).skip()
it('pending')
