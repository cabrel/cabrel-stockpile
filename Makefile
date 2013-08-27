test:
				npm test


coverage:
				LIB_COV=1 /usr/bin/mocha -R html-cov > coverage.html
				rm -rf lib-cov

.PHONY: test
