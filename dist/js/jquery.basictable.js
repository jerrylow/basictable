/*
 * @license jQuery Basictable | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
 */
(function($) {
  $.fn.basictable = function(options) {
    const setup = function(table, data) {
      const headings = [];
      if (data.tableWrap) {
        table.wrap('<div class="bt-wrapper"></div>');
      }
      if (data.header) {
        let format = "";
        if (table.find("thead tr th").length) {
          format = "thead th";
        } else if (table.find("tbody tr th").length) {
          format = "tbody tr th";
        } else if (table.find("th").length) {
          format = "tr:first th";
        } else {
          format = "tr:first td";
        }
        $.each(table.find(format), (function() {
          const $heading = $(this);
          const colspan = parseInt($heading.attr("colspan"), 10) || 1;
          const row = $heading.closest("tr").index();
          if (!headings[row]) {
            headings[row] = [];
          }
          for (let i = 0; i < colspan; i++) {
            headings[row].push($heading);
          }
        }));
      }
      $.each(table.find("tbody tr"), (function() {
        setupRow($(this), headings, data);
      }));
      $.each(table.find("tfoot tr"), (function() {
        setupRow($(this), headings, data);
      }));
    };
    const setupRow = function($row, headings, data) {
      $row.children().each((function() {
        const $cell = $(this);
        if (($cell.html() === "" || $cell.html() === "&nbsp;") && !data.showEmptyCells) {
          $cell.addClass("bt-hide");
        } else {
          const cellIndex = $cell.index();
          let headingText = "";
          for (let j = 0; j < headings.length; j++) {
            if (j !== 0) {
              headingText += ": ";
            }
            const $heading = headings[j][cellIndex];
            headingText += $heading.text();
          }
          $cell.attr("data-th", headingText);
          if (data.contentWrap && !$cell.children().hasClass("bt-content")) {
            $cell.wrapInner('<span class="bt-content" />');
          }
        }
      }));
    };
    const unwrap = function(table) {
      $.each(table.find("td"), (function() {
        const $cell = $(this);
        const content = $cell.children(".bt-content").html();
        $cell.html(content);
      }));
    };
    const check = function(table, data) {
      if (!data.forceResponsive) {
        if (table.removeClass("bt").outerWidth() > table.parent().width()) {
          start(table, data);
        } else {
          end(table, data);
        }
      } else {
        if (data.breakpoint !== null && $(window).width() <= data.breakpoint || data.containerBreakpoint !== null && table.parent().width() <= data.containerBreakpoint) {
          start(table, data);
        } else {
          end(table, data);
        }
      }
    };
    const start = function(table, data) {
      table.addClass("bt");
      if (!data.header) {
        table.addClass("bt--no-header");
      }
      if (data.tableWrap) {
        table.parent(".bt-wrapper").addClass("active");
      }
    };
    const end = function(table, data) {
      table.removeClass("bt bt--no-header");
      if (data.tableWrap) {
        table.parent(".bt-wrapper").removeClass("active");
      }
    };
    const destroy = function(table, data) {
      table.removeClass("bt bt--no-header");
      table.find("td").removeAttr("data-th");
      if (data.tableWrap) {
        table.unwrap();
      }
      if (data.contentWrap) {
        unwrap(table);
      }
      table.removeData("basictable");
    };
    const resize = function(table) {
      if (table.data("basictable")) {
        check(table, table.data("basictable"));
      }
    };
    this.each((function() {
      const table = $(this);
      if (table.length === 0 || table.data("basictable")) {
        if (table.data("basictable")) {
          const data = table.data("basictable");
          if (options === "destroy") {
            destroy(table, data);
          } else if (options === "restart") {
            destroy(table, data);
            table.data("basictable", data);
            setup(table, data);
            check(table, data);
          } else if (options === "start") {
            start(table, data);
          } else if (options === "stop") {
            end(table, data);
          } else {
            check(table, data);
          }
        }
        return false;
      }
      const settings = $.extend({}, $.fn.basictable.defaults, options);
      const vars = {
        breakpoint: settings.breakpoint,
        containerBreakpoint: settings.containerBreakpoint,
        contentWrap: settings.contentWrap,
        forceResponsive: settings.forceResponsive,
        noResize: settings.noResize,
        tableWrap: settings.tableWrap,
        showEmptyCells: settings.showEmptyCells,
        header: settings.header
      };
      if (vars.breakpoint === null && vars.containerBreakpoint === null) {
        vars.breakpoint = 568;
      }
      table.data("basictable", vars);
      setup(table, table.data("basictable"));
      if (!vars.noResize) {
        check(table, table.data("basictable"));
        $(window).bind("resize.basictable", (function() {
          resize(table);
        }));
      }
    }));
  };
  $.fn.basictable.defaults = {
    breakpoint: null,
    containerBreakpoint: null,
    contentWrap: true,
    forceResponsive: true,
    noResize: false,
    tableWrap: false,
    showEmptyCells: false,
    header: true
  };
})(jQuery);