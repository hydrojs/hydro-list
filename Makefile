
test: node_modules
	@node_modules/hydro/bin/hydro --setup test/hydro.conf.js

node_modules: package.json
	@npm install && touch $@

.PHONY: test
