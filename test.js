// if test function expects second named argument it will be executed
// in async mode and test will be complete only after callback is called
exports['test my async foo'] = function(assert, done) {
      done() // telling test runner that we're done with this test
}

if (module == require.main) require('test').run(exports)
