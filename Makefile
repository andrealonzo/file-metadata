REPORTER = list
test:
	clear
	echo Starting test ******************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	test
	echo Ending test
test-coverage:
	clear
	echo Starting test coverage ******************************************
	istanbul cover node_modules/.bin/_mocha test
	istanbul report html
	echo Ending test coverage
test-w:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER)  \
	--watch \
	test
	
.PHONY: test