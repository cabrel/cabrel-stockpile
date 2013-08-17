test:
	@node /usr/bin/mocha --recursive
test-cov:
	@node /usr/bin/mocha --recursive -R html-cov > coverage.html

.PHONY: test test-cov


